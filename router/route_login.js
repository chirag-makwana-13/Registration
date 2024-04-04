const express = require('express')
const { authMiddleware,verifyLoginMiddleware }=require('../middleware/auth')
const controller = require('../controller/login/login')
const router = express.Router();
router.get('/login',verifyLoginMiddleware,controller.login);
router.post('/login', controller.loginpage);

module.exports = router