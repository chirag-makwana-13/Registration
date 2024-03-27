const express = require('express')
const app = express()
const port = 3003
const bodyParser = require("body-parser"); 
const db = require('./db')
const path = require('path');
var crypto = require("crypto");
require("dotenv").config()
const md5 = require('md5')
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
const { CLIENT_RENEG_LIMIT } = require('tls');
const JWT_SECERET = "chiragmirazapur"
const { authMiddleware,verifyLoginMiddleware }=require('./middleware/auth')
app.set('view engine', 'ejs');
app.use(express.json())
const jwt = require('jsonwebtoken');
const localStorage = require('localStorage');
app.use(bodyParser.urlencoded({
  extended: true
}))
//***************************  Login   ********************************
app.use('/',require('./routes/register/register'))
app.use('/login',require('./routes/login/login'))
app.use('/forgotpassword',require('./routes/forgotpassword/forgotpassword'))
app.use('/profile',require('./routes/profile/profile'))
app.use(express.static(path.join(__dirname, 'public')))

// ---------------------profile-------------------------
app.all('/newprofile', authMiddleware,async (req, res) => {
  let profileq = `select * from userdata `;
  db.query(profileq, function (err, result) {
    res.render('alltask', { err: 'Login unsuccessfully....', result })
  })
})
// ----------------------logout----------------------------
app.get('/logout',(req,res)=>{
  try {
    localStorage.clear()
    res.redirect('/login/login')
  } catch (error) {
    return res,end('Try again')
  }
})
// ---------------------dynamictable-------------------------
app.get('/dynamictable',(req, res) => {
  res.render('dynamictable', { err: '' });
})
// ---------------------kukucude-------------------------
app.get('/kukucube',(req, res) => {
  res.render('kukucube', { err: '' });
})
// ---------------------tictactoe-------------------------
app.get('/tictactoe',(req, res) => {
  res.render('tictactoe', { err: '' });
})






app.all("*", (req, res) => {
  res.send("Not found data in database... &#128560;")
})
app.listen(port, () => {
  console.log(`Server run on port ${port}`)
})
