const express = require('express')
const router = express.Router()
const { authMiddleware,verifyLoginMiddleware }=require('../../middleware/auth')
const md5 = require('md5')
const bcrypt = require('bcryptjs');
const db = require('../../db')

router.all('/newprofile', authMiddleware,async (req, res) => {
    let profileq = `select * from userdata `;
    db.query(profileq, function (err, result) {
      res.render('alltask', { err: 'Login unsuccessfully....', result })
    })
  })
module.exports = router