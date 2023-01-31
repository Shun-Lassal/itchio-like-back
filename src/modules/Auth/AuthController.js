const UserModel = require('../User/UserModel')
const Repository = require('./AuthRepository')

var router = require('express').Router();


router.post('/register', async (req, res) => {



  const validationResult = UserModel.userSchema.validate(req.body);
  
  if (validationResult.error) { 
    return res.status(400).send(validationResult.error.details[0].message);
  }

  const result = await Repository.register(req.body)
  res.status(201).send(result);
});

router.post("/login", async (req, res) => {

  let test = await Repository.login(req.body)

  return res.status(200).send(test);
})

router.put("/changePassword", async (req, res) => {

  let result = await Repository.changePassword(req.body)

  if(result)
    return res.status(200).send("Mot de passe changé avec succès")
  else
    return res.status(400).send("Validation de l'ancien mot de passe incorrect")
})  


module.exports = router;