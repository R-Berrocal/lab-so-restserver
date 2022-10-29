const express = require('express')
const { createProcesssys, get } = require('../controllers/processys')

const router = express.Router()

router.get('/', get)
router.post('/', createProcesssys)

module.exports = router
