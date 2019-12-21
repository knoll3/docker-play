const express = require("express")

const app = express()

app.get("/app2", function(req, res) {
  res.send("Hello from the Server2")
})

app.listen(3002)

