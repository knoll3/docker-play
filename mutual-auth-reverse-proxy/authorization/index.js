const express = require("express")
const authController = require("./controllers/auth.controller")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const port = 3004

app.use("/", authController)

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})

