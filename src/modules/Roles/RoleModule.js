const Model = require('./RoleModel')
const Controller = require('./RoleController')
const Repository = require('./RoleRepository')

const provider = {
  Endpoint: '/roles',
  Model,
  Controller,
  Repository
}

module.exports = {
  Model,
  Repository,
  provider
}