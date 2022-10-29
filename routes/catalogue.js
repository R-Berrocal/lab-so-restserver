const express = require('express')
const {
  createCatalogue,
  get,
  getCatalogue,
  updateCatalogue,
  deleteCatalogue,
} = require('../controllers/catalogue')

const router = express.Router()

router.get('/', get)
router.get('/:id', getCatalogue)
router.post('/', createCatalogue)
router.put('/:id', updateCatalogue)
router.delete('/:id', deleteCatalogue)

module.exports = router
