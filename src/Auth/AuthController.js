
const AuthRepository = require('./AuthRepository')
const { User, userSchema } = require("../User/userModel");
var router = require('express').Router();

// in this case I get the language tag from a Localhost. 
// my two possible tags are just 'it' and 'en'

router.post("/login", async (req, res) => {
  const result = await AuthRepository.signIn(req.body)
  console.log(result, 'result controller')
  res.status(200).send(result);
})

// change password 

// restet password 

module.exports = router;