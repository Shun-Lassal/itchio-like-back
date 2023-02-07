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
  // app.listen(process.env.PORT, "192.168.170.150", () => {}); // wifi tel jo
  app.listen(process.env.PORT, "192.168.174.150", () => {}); // wifi blackbox
  // app.listen(process.env.PORT, "192.168.1.71", () => {}); // wifi chez jo
};

module.exports = {
  initialize,
  start,
};
