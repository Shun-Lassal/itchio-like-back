const UserModel = require("../User/UserModel");
const Repository = require("./AuthRepository");
const Logger = require("../../utils/logger");
const Auth = require("../../utils/auth");

var router = require("express").Router();

router.post("/register", async (req, res) => {
  Logger.http(req, res);
  try {
    const validationResult = UserModel.userSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }
    const result = await Repository.register(req.body);
    Logger.success();

    return res.status(201).send(result);
  } catch (error) {
    Logger.error();

    return res.status(400).send();
  }
});

router.post("/login", async (req, res) => {
  Logger.http(req, res);

  try {
    let result = await Repository.login(req.body);
    Logger.success();
    return res.status(200).send(result);
  } catch (error) {
    Logger.error();
    return res.status(400).send();
  }
});

router.put("/changePassword", Auth, async (req, res) => {
  Logger.http(req, res);

  try {
    let result = await Repository.changePassword(req.body);

    if (result) {
      Logger.success();
      return res.status(200).send(result);
    } else {
      Logger.error();
      return res
        .status(400)
        .send("Validation de l'ancien mot de passe incorrect");
    }
  } catch (error) {
    Logger.error();

    return res.status(400).send();
  }
});

module.exports = router;
