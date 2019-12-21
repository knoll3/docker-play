const express = require("express")

const app = express()

app.get("/app1", function(req, res) {
  const cn = req.headers["ssl-client-cn"]
  res.send(`Hello, ${cn}, from Server1`)
})

app.listen(3001)

