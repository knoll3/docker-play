const express = require("express")
const AuthService = require("../services/AuthService")
const authService = new AuthService()

const router = express.Router()

router.post("/authorization/jwts", function(req, res) {
  const cn = req.headers["ssl-client-cn"]
  const token = authService.login(cn)
  if (token) {
    res.send(token)
  } else {
    res(403).send()
  }
})

module.exports = router
