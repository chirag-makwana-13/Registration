const express = require('express')
const router = express.Router()
const { authMiddleware,verifyLoginMiddleware }=require('../../middleware/auth')
const md5 = require('md5')
const bcrypt = require('bcryptjs');
const db = require('../../db')
const JWT_SECERET = "chiragmirazapur"
const jwt = require('jsonwebtoken');
const localStorage = require('localStorage');



// -------------------forgetpassword-------------------
router.all('/forgetpassword', async (req, res) => {
    try {
      if(req.method == 'GET'){
        res.render('email',{err:''})
      }else{
      let password = req.body.password;
      let salt_key = await bcrypt.genSalt(10)
      console.log('rt', salt_key);
      let encryptpassweprd = md5(password + salt_key)
      let queryusers = `update userlogin set password='${encryptpassweprd}', pwsalt='${salt_key}' where email= '${req.body.email}'`
      db.query(queryusers, (err, result) => {
        res.render('login', { email: req.body.email, err: '' })
      })
      }
    } catch (error) {
      res.write("Try again ")
      return res.end()
    }
  })
  router.all('/verifyforgetpassword', async (req, res) => {
      try {
        let email= req.body.email;
        res.render('tokenpassword',{email:email,err:'',expire:false})
      } catch (error) {
        res.write("Try again ")
        return res.end()
      }
  })
  router.all('/verifyuser', (req, res) => {
    try {
      let getdata = `select * from userdata where email='${req.query.email}' AND activationcode='${req.query.code}'`;
      db.query(getdata, function (err, result) {
        console.log(result);
        if (err) {
          return res.render('tokenpassword', { email: req.query.email,code:'', err: "" , expire:false })
        }
        if (result.length == 0) {
          res.render('tokenpassword', { email: req.query.email,code:'', err: "Invalid Activation Code....",expire:false })
          // res.send('Invalid Activation Code....')
        } else {
          let r_time=new Date (result[0].timestamp);
          let current = new Date()
          let diff = Math.abs(current-r_time)
          if(diff<3600000){
            let activequery = `update userdata set active_status = 1 where email= '${req.query.email}'`
            db.query(activequery, function (err, result) {
              console.log("hiiiiii",result);
              return res.render('password', { email: req.query.email,is_forgot:true })
            })
          }else {
            return res.render('tokenpassword', { email: req.query.email, err: "code expire" , expire:true })
          }
        }
        // res.json({'data':result})
      });
    } catch (error) {
      res.write("Try again ")
      return res.end()
    }
  }) 
  // ---------------------checklogin-------------------------
  router.post('/checklogin', async (req, res) => {
    try {
      let success = false;
      console.log(req.body);
      let password = req.body.password;
      let getdata = `select pwsalt from userlogin where email='${req.body.email}'`;
      db.query(getdata, function (err, result) {
        // console.log(result);
        if (result == "") {
          return res.status(400).json({ success, err: err })
        } else {
          let salt_key = result[0].pwsalt;
          let encryptpassword = md5(password + salt_key)
          let getpassword = `select * from userlogin where email='${req.body.email}' and password='${encryptpassword}'`
          db.query(getpassword, function (err, result) {
            if (err) {
              res.render('login', { err: 'Invalid password and user....' })
            }
            if (result.length == 0) {
              res.render('login', { err: 'Invalid password and user....' })
            } else {
              let token= jwt.sign(req.body.email,JWT_SECERET)
              console.log("token:",token);
              localStorage.setItem('authToken',token)
              res.redirect('/newprofile')
            }
          })
        }
      });
    } catch (error) {
      res.write("Try again ")
      return res.end()
    }
  })
  module.exports = router