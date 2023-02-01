require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.header('authorization');
  token = token.substring(7)

  if (!token) return res.status(401).send("NOP NOP NOP, NOT AUTHORIZED");

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded;
    
    next();
  } catch (ex) {
    res.status(400).send("NOP INVALIDE TOKEN");
  }
};