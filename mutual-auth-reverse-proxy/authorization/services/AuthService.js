class AuthService {

  login(cn) {
    const user = this._findUserByCn(cn)
    return this._createToken(user.id)
  }

  _findUserByCn(cn) {
    return {id: "2k3jh42kj34", name: "username"}
  }

  _createToken(id) {
    return {jwt: "legit_tokin"}
  }
}

module.exports = AuthService
