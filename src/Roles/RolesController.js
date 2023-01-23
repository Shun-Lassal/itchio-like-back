
const RolesRepository = require('./RolesRepository')
const { Roles, rolesSchema } = require("./RolesModel");

var router = require('express').Router();

router.get('/', async (req,res) => {
  const result = await RolesRepository.findRolesByAny(req.body)
  console.log(result, 'anyresult')
  return res.status(200).send(result);
})

router.get('/:id', async (req,res) => {
  const result = await RolesRepository.findRoleById(req.body.id)
  console.log(result, 'anyresult')
  return res.status(200).send(result);
})

router.post('/', async (req, res) => {

  const validationResult = rolesSchema.validate(req.body);
  console.log(req.body,'ici')

  if (validationResult.error) { 
    console.log(validationResult.error)
    return res.status(400).send(validationResult.error.details[0].message);
  }
  
  const result = await RolesRepository.createRole(req.body)
  
  res.status(201).send(result);
});

router.put('/', async (req, res) => {
  let result = await RolesRepository.updateAnyRoleValues(req.body) 
  res.send(result)
})

router.delete('/:id', async (req, res) => {
  console.log(req.body)
  let result = await RolesRepository.deleteRoleById(req.body)
  res.send(result);
});

module.exports = router;