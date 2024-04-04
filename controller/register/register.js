const express = require('express')
const router = express.Router()
var crypto = require("crypto");
const db = require('../../db')
const { authMiddleware,verifyLoginMiddleware }=require('../../middleware/auth')
// -----------------Registration-----------------------
const home = (req, res) => {
    res.render('regi', { err: '' });
  }
  //---------------------verify-------------------------
   const register = (req, res) => {
    var activation_code = crypto.randomBytes(2).toString('hex');
    console.log("random:", activation_code);
    let queryusers = `INSERT INTO userdata (firstname,lastname,email,activationcode)  VALUES ('${req.body.firstname}','${req.body.lastname}','${req.body.email}','${activation_code}');`
    db.query(queryusers, (err, result) => {
      if (err) {
        res.render('regi', { err: "User already exist",result })
      }
      console.log(req.body.email);
      return res.render('verify', { email: req.body.email,code:activation_code, err: '',expire:false })
    })
  }
  // -------------------activation-------------------
   const activationcode =(req,res)=>{
    var activation_code = crypto.randomBytes(2).toString('hex');
    let a_update = `update userdata set activationcode='${activation_code}' where email='${req.body.email}'`
    db.query(a_update, (err, result) => {
        if(err) throw err;
        return res.status(200).json({activation_code:activation_code})
    })
  }
  //---------------------password------------------------
 const verify = (req, res) => {
    try {
      let getdata = `select * from userdata where email='${req.query.email}' AND activationcode='${req.query.code}'`;
      db.query(getdata, function (err, result) {
        // console.log(result);
        if (err) {
          return res.render('verify', { email: req.query.email,code:'', err: "" , expire:false })
        }
        if (result.length == 0) {
          res.render('verify', { email: req.query.email,code:'', err: "Invalid Activation Code....",expire:false })
        } else {
          let r_time=new Date (result[0].timestamp);
          let current = new Date()
          let diff = Math.abs(current-r_time)
          if(diff<3600000){
            let activequery = `update userdata set active_status = 1 where email= '${req.query.email}'`
            db.query(activequery, function (err, result) {
              // console.log("hiiiiii",result);
              return res.render('password', { email: req.query.email,is_forgot:false,code:req.query.code })
            })
          }else {
            return res.render('verify', { email: req.query.email, err: "code expire" , expire:true,code:req.query.code })
          }
        }
        // res.json({'data':result})
      });
    } catch (error) {
      res.write("Try again ")
      return res.end()
    }
  }
  module.exports={home,register,activationcode,verify};