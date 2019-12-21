const express = require("express")

const app = express()

app.get("/app3", function(req, res) {
  res.send("Hello from the Server3")
})

app.listen(3003)

