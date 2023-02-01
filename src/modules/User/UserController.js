var router = require("express").Router();
const Repository = require("./UserRepository");
const logger = require("../../utils/logger");

router.get("/", async (req, res) => {
  logger.custom.http(
    `${new Date().toLocaleString()} | ${req.baseUrl}${req.url} `
  );

  try {
    const result = await Repository.findUsersByAny(req.body);
    logger.custom.success("Request response received successfully");
    return res.status(200).send(result);
  } catch (error) {
    logger.custom.error("Request ended unsuccessfully.");

    return res.status(400).send();
  }
});

router.get("/:id", async (req, res) => {
  logger.custom.http(
    `${new Date().toLocaleString()} | ${req.baseUrl}${req.url} `
  );

  try {
    const result = await Repository.findUserById(req.params.id);
    logger.custom.success("Request response received successfully");
    return res.status(200).send(result);
  } catch (error) {
    logger.custom.error("Request ended unsuccessfully.");

    return res.status(400).send();
  }
});

router.put("/:id", async (req, res) => {
  logger.custom.http(
    `${new Date().toLocaleString()} | ${req.baseUrl}${req.url} `
  );

  try {
    let result = await Repository.updateAnyUserValues(req.params.id, req.body);
    logger.custom.success("Request response received successfully");
    return res.status(201).send(result);
  } catch (error) {
    logger.custom.error("Request ended unsuccessfully.");

    return res.status(400).send();
  }
});

router.delete("/:id", async (req, res) => {
  logger.custom.http(
    `${new Date().toLocaleString()} | ${req.baseUrl}${req.url} `
  );

  try {
    let result = await Repository.deleteUserById(req.params.id);
    logger.custom.success("Request response received successfully");

    return res.status(204).send(result);
  } catch (error) {
    logger.custom.error("Request ended unsuccessfully.");

    return res.status(400).send();
  }
});

module.exports = router;
