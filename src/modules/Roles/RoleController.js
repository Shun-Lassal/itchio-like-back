

// const RolesRepository = require('./RoleRepository');
// const { Roles, rolesSchema } = require("./RoleModel");

// const {Model, Repository} = require('./RoleModule')
const Model = require('./RoleModel')
const Repository = require('./RoleRepository')

const  auth  = require ('../../middleware/auth');
var router = require('express').Router();

router.get('/', auth, async (req,res) => {
  const result = await Repository.findRolesByAny(req.body)
  return res.status(200).send(result);
})

router.get('/:id', auth, async (req,res) => {
  const result = await Repository.findRoleById(req.params.id)
  return res.status(200).send(result);
})

router.post('/', auth, async (req, res) => {

  const validationResult = Model.rolesSchema.validate(req.body);

  if (validationResult.error) { 
    return res.status(400).send(validationResult.error.details[0].message);
  }
  const result = await Repository.createRole(req.body)
  
  res.status(201).send(result);
});

router.put('/:id', auth, async (req, res) => {
  let result = await Repository.updateAnyRoleValues(req.params.id, req.body) 
  res.status(201).send(result)
})

router.delete('/:id', auth, async (req, res) => {
  let result = await Repository.deleteRoleById(req.params.id)
  res.status(204).send(result);
});

module.exports = router;