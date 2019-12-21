const express = require("express")

const app = express()

app.get("/app1", function(req, res) {
  res.send("Hello from the Server1")
})

app.listen(3001)

