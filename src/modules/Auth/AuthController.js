const UserModel = require('../User/UserModel')
const Repository = require('./AuthRepository')
const logger = require('../../utils/logger') 

var router = require('express').Router();

router.post('/register', async (req, res) => {
  logger.custom.http(`${new Date().toLocaleString()} | ${req.baseUrl}${req.url} `)

  try {
    const validationResult = UserModel.userSchema.validate(req.body);
    
    if (validationResult.error) { 
      return res.status(400).send(validationResult.error.details[0].message);
    }
    const result = await Repository.register(req.body)
    logger.custom.success('Request response received successfully')

    return res.status(201).send(result);
    
  } catch (error) {
    logger.custom.error('Request ended unsuccessfully.')

    return res.status(400).send()
  }
});

router.post("/login", async (req, res) => {
  logger.custom.http(`${new Date().toLocaleString()} | ${req.baseUrl}${req.url} `)

  try {
    let result = await Repository.login(req.body)
    logger.custom.success('Request response received successfully')
    
    return res.status(200).send(result);
  } catch (error) {
    logger.custom.error('Request ended unsuccessfully.')

    return res.status(400).send()
  }
})

router.put("/changePassword", async (req, res) => {

logger.custom.http(`${new Date().toLocaleString()} | ${req.baseUrl}${req.url} `)
  
try {
  let result = await Repository.changePassword(req.body)
  
  if(result){

    logger.custom.success('Request response received successfully')
    return res.status(200).send(result);  
  }
  else {
    return res.status(400).send("Validation de l'ancien mot de passe incorrect")
  }
  
} catch (error) {
  logger.custom.error('Request ended unsuccessfully.')

  return res.status(400).send()
}
})  


module.exports = router;