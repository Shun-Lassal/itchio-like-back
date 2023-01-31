const Model = require('./UserModel')
const Controller = require('./UserController')
const Repository = require('./UserRepository')

const provider = {
  Endpoint: '/users',
  Model,
  Controller,
  Repository
}

module.exports = {
  Model,
  Repository,
  provider
}
