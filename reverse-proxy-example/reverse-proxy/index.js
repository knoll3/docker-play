const express = require("express")
const httpProxy = require("http-proxy")
const routes = require("./routes")

const app = express()
const apiProxy = httpProxy.createProxyServer()
const port = 3000

routes.forEach(route => {
  app.all(route.path + "/*", function(req, res) {
    apiProxy.web(req, res, {target: route.endpoint})
  })
})

app.listen(port, function() {
  console.log("Listening on port " + port)
})
