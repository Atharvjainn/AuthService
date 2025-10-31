const express = require('express')
const router = express.Router()

const V1ApiRoutes = require('./V1/index')

router.use('/V1',V1ApiRoutes)


module.exports = router