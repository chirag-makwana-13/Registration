const express = require('express')
const { authMiddleware,verifyLoginMiddleware }=require('../middleware/auth')
const controller = require('../controller/register/register')
const router = express.Router();
router.get('/', verifyLoginMiddleware ,controller.home);
router.post('/register', controller.register);
router.post('/activationcode', controller.activationcode);
router.all('/verify',  controller.verify);

module.exports = router