const Router = require("express").Router();
const Repository = require("./UserRepository");
const Logger = require("../../utils/Logger");
const Auth = require("../../utils/Auth");

Router.get("/", Auth, async (req, res) => {
  Logger.http(req, res);

  try {
    const result = await Repository.findUsersByAny(req.body);
    Logger.success();
    return res.status(200).send(result);
  } catch (error) {
    Logger.error();
    return res.status(400).send();
  }
});

Router.get("/:id", Auth, async (req, res) => {
  Logger.http(req, res);

  try {
    const result = await Repository.findUserById(req.params.id);
    Logger.success();
    return res.status(200).send(result);
  } catch (error) {
    Logger.error();
    return res.status(400).send();
  }
});

Router.put("/:id", Auth, async (req, res) => {
  Logger.http(req, res);

  try {
    let result = await Repository.updateAnyUserValues(req.params.id, req.body);
    Logger.success();
    return res.status(201).send(result);
  } catch (error) {
    Logger.error();

    return res.status(400).send();
  }
});

Router.delete("/:id", Auth, async (req, res) => {
  Logger.http(req, res);

  try {
    let result = await Repository.deleteUserById(req.params.id);
    Logger.success();

    return res.status(204).send(result);
  } catch (error) {
    Logger.error();

    return res.status(400).send();
  }
});

module.exports = Router;
