require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const initialize = (app) => {
  app.use(express.json());

  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );

  app.use(bodyParser.json());
  app.use(cors());
};

const start = (app) => {
  app.listen(process.env.PORT, () => {});
};

module.exports = {
  initialize,
  start,
};
