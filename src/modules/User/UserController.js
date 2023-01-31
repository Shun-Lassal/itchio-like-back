var router = require('express').Router();
const Repository = require('./UserRepository')
const logger = require('../../utils/logger')

router.get('/', async (req,res) => {

try {
  logger.debug('test')
  logger.info('test')
  logger.error('test')
  logger.warn('test')
  logger.http('test')

  const result = await Repository.findUsersByAny(req.body)

  return res.status(200).send(result);
} catch (error) {
  logger.error()
  return res.status(400).send()
}

})

router.get('/:id',async (req,res) => {
  const result = await Repository.findUserById(req.params.id)
  return res.status(200).send(result);
})

router.put('/:id', async (req, res) => {
  let result = await Repository.updateAnyUserValues(req.params.id, req.body) 
  res.status(201).send(result)
})

router.delete('/:id', async (req, res) => {
  let result = await Repository.deleteUserById(req.params.id)
  res.status(204).send(result);
});

module.exports = router;