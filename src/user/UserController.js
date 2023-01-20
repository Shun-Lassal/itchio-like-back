
const userServices = require('./services/UserServices')
const { User, userSchema } = require("./schemas/userSchema");
const { itErrors, enErrors } = require('../const/customError');
var router = require('express').Router();

// in this case I get the language tag from a Localhost. 
// my two possible tags are just 'it' and 'en'
router.get('/findany', async (req,res) => {
  const result = await userServices.findUsersByAny(req.body)
  console.log(result, 'anyresult')
  return res.status(200).send(result);
})

router.post("/connexion", async (req, res) => {
  const result = await userServices.connexion(req.body.email, req.body.password)
  console.log(result, 'result controller')
  res.status(200).send(result);

})

router.post('/create', async (req, res) => {

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

  const result = await userServices.createUser(req.body)
  
  res.status(201).send(result);
});



router.get('/find', async (req,res) => {
  const result = await userServices.findUsersByAny(req.body) // by all 
  console.log(req.body.email,"coucou")

  res.send(result)
})

router.put('/modify', (req, res) => {
  let result = userServices.updateAnyUserValues(req.body) 
  res.send(result)
})

router.delete('/delete', (req, res) => {
  res.send(req);
});

module.exports = router;