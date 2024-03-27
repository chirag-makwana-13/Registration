const express = require('express')
const router = express.Router()
const { authMiddleware,verifyLoginMiddleware }=require('../../middleware/auth')
const md5 = require('md5')
const bcrypt = require('bcryptjs');
const db = require('../../db')


router.get('/login',verifyLoginMiddleware,(req,res)=>{
    res.render('login',{err: ''})
  })
  router.post('/login', async (req, res) => {
    try {
      console.log(req.body.password);
      let password = req.body.password;
      let salt_key = await bcrypt.genSalt(10)
      console.log('rt', salt_key);
      let encryptpassweprd = md5(password + salt_key)
      let queryusers = `insert into userlogin (email,password,pwsalt) values ('${req.body.email}','${encryptpassweprd}','${salt_key}')`
      db.query(queryusers, (err, result) => {
        res.render('login', { email: req.body.email, err: '' })
      })
    } catch (error) {
      res.write("Try again ")
      return res.end()
    }
  })
  module.exports = router