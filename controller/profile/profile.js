const express = require('express')
const router = express.Router()
const { authMiddleware,verifyLoginMiddleware }=require('../../middleware/auth')
const db = require('../../db')

 const profile = async (req, res) => {
    let profileq = `select * from userdata `;
    db.query(profileq, function (err, result) {
      res.render('alltask', { err: 'Login unsuccessfully....', result })
    })
  }
module.exports = {profile}