
const UserRepository = require('./UserRepository')
const { User, userSchema } = require("./userModel");
const { itErrors, enErrors } = require('../const/customError');
var router = require('express').Router();

// in this case I get the language tag from a Localhost. 
// my two possible tags are just 'it' and 'en'
router.get('/', async (req,res) => {
  const result = await UserRepository.findUsersByAny(req.body)
  console.log(result, 'anyresult')
  return res.status(200).send(result);
})

router.get('/:id', async (req,res) => {
  const result = await UserRepository.findUsersById(req.body.id)
  console.log(result, 'anyresult')
  return res.status(200).send(result);
})

router.post('/', async (req, res) => {

  const options = {
    errors : {
        labels: false,
        language: 'en'
    },
    messages: {
        it: { ...itErrors },
        en: { ...enErrors }
    }
  };
  
  const validationResult = userSchema.validate(req.body, options.messages.en);
  
  if (validationResult.error) { 
    console.log(validationResult.error)
    return res.status(400).send(validationResult.error.details[0].message);
  }

  const result = await UserRepository.createUser(req.body)
  
  res.status(201).send(result);
});

router.put('/', (req, res) => {
  let result = UserRepository.updateAnyUserValues(req.body) 
  res.send(result)
})

router.delete('/:id', async (req, res) => {
  console.log(req.body)
  let result = await UserRepository.deleteUserById(req.body)
  res.send(result);
});


router.post("/connexion", async (req, res) => {
  const result = await UserRepository.connexion(req.body.email, req.body.password)
  console.log(result, 'result controller')
  res.status(200).send(result);

})

module.exports = router;