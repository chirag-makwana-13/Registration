const express = require('express')
const { authMiddleware,verifyLoginMiddleware }=require('../middleware/auth')
const controller = require('../controller/profile/profile')
const router = express.Router();
router.all('/newprofile', authMiddleware,controller.profile);

module.exports = router