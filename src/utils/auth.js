require("dotenv").config();
const jwt = require("jsonwebtoken");

const Logger = require("../utils/logger");

module.exports = (req, res, next) => {
  Logger.http(req, res);
  let token = req.header("authorization");

  if (token) {
    token = token.substring(7);
  }

  if (!token) {
    Logger.unauthorized();
    return res.status(401).send("");
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    console.log(decoded, "payload");
    req.user = decoded;
    Logger.success();
    next();
  } catch (ex) {
    Logger.invalidToken(), res.status(400).send("");
  }
};
