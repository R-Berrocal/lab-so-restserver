const express = require('express')
const { get } = require('../controllers/index')
const processys = require('./processys')
const process = require('./process')
const catalogue = require('./catalogue')

const router = express.Router()

router.get('/', get)
router.use('/processys', processys)
router.use('/process', process)
router.use('/catalogue', catalogue)

module.exports = router
