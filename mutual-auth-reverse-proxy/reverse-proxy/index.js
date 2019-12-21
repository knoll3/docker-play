const express = require("express")
const httpProxy = require("http-proxy")
const routes = require("./routes")
const https = require("https")
const fs = require("fs")

const opts = {
  key: fs.readFileSync("certs/server_key.pem"),
  cert: fs.readFileSync("certs/server_cert.pem"),
  requestCert: true,
  rejectUnauthorized: false,
  ca: [ fs.readFileSync("certs/server_cert.pem") ]
}

const app = express()
const apiProxy = httpProxy.createProxyServer()
const port = 3000

routes.forEach(route => {
  app.all(route.path + "/*", function(req, res) {
    const cert = req.connection.getPeerCertificate()
    if (req.client.authorized) {
      req.headers["ssl-client-cn"] = cert.subject.CN
      apiProxy.web(req, res, {target: route.endpoint})
    } else if (cert.subject) {
      res.status(403).send(`${cert.subject.CN} is not authorized.`)
    } else {
      res.status(401).send("You need to provide a client certificate to continue.")
    }
  })
})

https.createServer(opts, app).listen(port, function() {
  console.log("Listening on port " + port)
})

