const express = require('express')
const router = express.Router()
const { authMiddleware,verifyLoginMiddleware }=require('../../middleware/auth')
router.get('/',authMiddleware,(req, res) => {
    res.render('html3', { err: '' });
  })
  module.exports = router