const express = require('express')
const {
  createProcess,
  get,
  getProcess,
  updateProcess,
  deleteProcess,
} = require('../controllers/process')

const router = express.Router()

router.get('/', get)
router.get('/:id', getProcess)
router.post('/:id', createProcess)
router.put('/:id', updateProcess)
router.delete('/:id', deleteProcess)

module.exports = router
