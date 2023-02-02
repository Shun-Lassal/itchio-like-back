const Model = require("./UserModel");
const Controller = require("./UserController");
const Repository = require("./UserRepository");
const Seed = require("./UserSeed");

const provider = {
  Endpoint: "/users",
  Model,
  Controller,
  Repository,
  Seed,
};

module.exports = {
  Model,
  Repository,
  provider,
  Seed,
};
