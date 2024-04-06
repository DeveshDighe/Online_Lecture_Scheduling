const express = require('express');
const router = express.Router()
const authRoutes = require('./authRoutes.js')
const courseRoutes = require('./courseRoutes.js')
const userRoutes = require('./userRoutes.js')

router.use('/auth', authRoutes)
router.use('/course', courseRoutes)
router.use('/users', userRoutes)

module.exports = router;