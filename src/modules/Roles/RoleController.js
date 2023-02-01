const Model = require("./RoleModel");
const Repository = require("./RoleRepository");
const logger = require("../../utils/logger");

const auth = require("../../utils/auth");
var router = require("express").Router();

router.get("/", auth, async (req, res) => {
  logger.custom.http(
    `${new Date().toLocaleString()} | ${req.baseUrl}${req.url} `
  );
  try {
    const result = await Repository.findRolesByAny(req.body);
    logger.custom.success("Request response received successfully");

    return res.status(200).send(result);
  } catch (error) {
    logger.custom.error("Request ended unsuccessfully.");

    return res.status(400).send();
  }
});

router.get("/:id", auth, async (req, res) => {
  logger.custom.http(
    `${new Date().toLocaleString()} | ${req.baseUrl}${req.url} `
  );

  try {
    const result = await Repository.findRoleById(req.params.id);
    logger.custom.success("Request response received successfully");

    return res.status(200).send(result);
  } catch (error) {
    logger.custom.error("Request ended unsuccessfully.");

    return res.status(400).send();
  }
});

router.post("/", auth, async (req, res) => {
  logger.custom.http(
    `${new Date().toLocaleString()} | ${req.baseUrl}${req.url} `
  );
  try {
    const validationResult = Model.rolesSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }
    const result = await Repository.createRole(req.body);
    logger.custom.success("Request response received successfully");

    return res.status(201).send(result);
  } catch (error) {
    logger.custom.error("Request ended unsuccessfully.");

    return res.status(400).send();
  }
});

router.put("/:id", auth, async (req, res) => {
  logger.custom.http(
    `${new Date().toLocaleString()} | ${req.baseUrl}${req.url} `
  );

  try {
    let result = await Repository.updateAnyRoleValues(req.params.id, req.body);
    logger.custom.success("Request response received successfully");

    return res.status(201).send(result);
  } catch (error) {
    logger.custom.error("Request ended unsuccessfully.");

    return res.status(400).send();
  }
});

router.delete("/:id", auth, async (req, res) => {
  logger.custom.http(
    `${new Date().toLocaleString()} | ${req.baseUrl}${req.url} `
  );

  try {
    let result = await Repository.deleteRoleById(req.params.id);
    logger.custom.success("Request response received successfully");

    return res.status(204).send(result);
  } catch (error) {
    logger.custom.error("Request ended unsuccessfully.");

    return res.status(400).send();
  }
});

module.exports = router;
