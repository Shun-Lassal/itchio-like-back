var router = require('express').Router();

const UserRepository = require('./UserRepository')
const auth = require('../middleware/auth')

router.get('/', auth, async (req,res) => {
  const result = await UserRepository.findUsersByAny(req.body)
  return res.status(200).send(result);
})

router.get('/:id', auth, async (req,res) => {
  const result = await UserRepository.findUsersById(req.params.id)
  return res.status(200).send(result);
})

router.put('/:id', auth, (req, res) => {
  let result = UserRepository.updateAnyUserValues(req.params.id, req.body) 
  res.send(result)
})

router.delete('/:id', auth, async (req, res) => {
  let result = await UserRepository.deleteUserById(req.params.id)
  res.send(result);
});


module.exports = router;