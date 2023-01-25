const AuthRepository = require('./AuthRepository')
const { User, userSchema } = require("../User/userModel");
var router = require('express').Router();

// in this case I get the language tag from a Localhost. 
// my two possible tags are just 'it' and 'en'


router.post('/register', async (req, res) => {
  const validationResult = userSchema.validate(req.body);
  
  if (validationResult.error) { 
    console.log(validationResult.error)
    return res.status(400).send(validationResult.error.details[0].message);
  }

  const result = await AuthRepository.register(req.body)
  res.status(201).send(result);
});

router.post("/login", async (req, res) => {
  // const result = await AuthRepository.signIn(req.body)
  // res.status(200).send(result);
  let result = await AuthRepository.login(req.body)

  return res.status(200).send(result);
})

// change password 

// restet password 

module.exports = router;