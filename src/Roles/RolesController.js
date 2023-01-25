
const RolesRepository = require('./RolesRepository');
const { Roles, rolesSchema } = require("./RolesModel");
const  auth  = require ('../middleware/auth');
var router = require('express').Router();

router.get('/', auth, async (req,res) => {
  const result = await RolesRepository.findRolesByAny(req.body)
  return res.status(200).send(result);
})

router.get('/:id', auth, async (req,res) => {
  const result = await RolesRepository.findRoleById(req.params.id)
  return res.status(200).send(result);
})

router.post('/', auth, async (req, res) => {

  const validationResult = rolesSchema.validate(req.body);

  if (validationResult.error) { 
    console.log(validationResult.error)
    return res.status(400).send(validationResult.error.details[0].message);
  }
  const result = await RolesRepository.createRole(req.body)
  
  res.status(201).send(result);
});

router.put('/:id', auth, async (req, res) => {
  let result = await RolesRepository.updateAnyRoleValues(req.params.id, req.body) 
  res.send(result)
})

router.delete('/:id', auth, async (req, res) => {
  let result = await RolesRepository.deleteRoleById(req.params.id)
  res.send(result);
});

module.exports = router;