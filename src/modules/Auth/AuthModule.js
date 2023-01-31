const Controller = require('./AuthController')
const Repository = require('./AuthRepository')
const Model = require('../User/UserModel')

const provider = {
  Endpoint: '/auth',
  Controller,
  Repository,
  Model,
}

module.exports = { provider,
  Model,
  Repository,
}