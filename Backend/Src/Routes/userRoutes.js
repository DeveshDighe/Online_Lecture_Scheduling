const express = require('express');
const { getAllUserController, UserProfile, getLectures } = require('../Controller/user.controller.js');

const authenticate = require('../Middleware/authenticate.js')
// const authenticate = require('../Middleware/authenticate.js')
const router = express.Router()

router.get('/getAllUser',getAllUserController)
router.post('/getUserProfile' ,UserProfile)
router.get('/getUserlectures', authenticate ,getLectures)


module.exports = router