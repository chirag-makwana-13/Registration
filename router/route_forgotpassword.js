const express = require('express')
const { authMiddleware,verifyLoginMiddleware }=require('../middleware/auth')
const controller = require('../controller/forgotpassword/forgotpassword')
const router = express.Router();
router.all('/forgotpassword',controller.forgot);
router.all('/verifyforgetpassword', controller.verifyforgot);
router.all('/verifyuser', controller.verifyuser);
router.post('/checklogin',  controller.checklogin);

module.exports = router