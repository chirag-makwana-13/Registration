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
app.use(express.static(path.join(__dirname, 'public')))
//***************************  All router  ********************************

//----------------Registration and Login----------
app.use('/',require('./routes/register/register'))
app.use('/login',require('./routes/login/login'))
app.use('/forgotpassword',require('./routes/forgotpassword/forgotpassword'))
app.use('/profile',require('./routes/profile/profile'))

//----------------Dyanmic table--------------------
app.use('/dynamictable', authMiddleware,require('./routes/dynamictable/dynamictable'))

//----------------Kuku cube------------------------
app.use('/kukucube', authMiddleware,require('./routes/kukucube/kukucube'))

//----------------Tic-Tac-Toe----------------------
app.use('/tictactoe', authMiddleware,require('./routes/tictactoe/tictactoe'))

//----------------Js Event-------------------------
app.use('/jsevent', authMiddleware,require('./routes/jsevent/jsevent'))

//----------------Html and Css Task----------------
app.use('/html1', authMiddleware,require('./routes/html1/html1'))
app.use('/html2', authMiddleware,require('./routes/html2/html2'))
app.use('/html3', authMiddleware,require('./routes/html3/html3'))

//----------------Student CRUD opration------------
app.use('/student', authMiddleware,require('./routes/studentscrudfile/studentfilecrud'))
app.use('/studentdb', authMiddleware,require('./routes/studentcruddb/studentcruddb'))
app.use('/attendance', authMiddleware,require('./routes/attendance/attendance'))
app.use('/delimeter', authMiddleware,require('./routes/delimeter/delimeter'))
app.use('/grid', authMiddleware,require('./routes/grid/grid'))

//----------------Job Application Form--------------
app.use('/jobapplicaiton', authMiddleware,require('./routes/jobapplicaiton/jobapplicaiton'))
app.use('/ajaxjobapplicaiton', authMiddleware,require('./routes/ajaxjobapplicaiton/ajaxjobapplicaiton'))
app.use('/jsonplaceholder', authMiddleware,require('./routes/jsonplaceholder/jsonplaceholder'))

//----------------Time Zone--------------------------
app.use('/timezone', authMiddleware,require('./routes/timezone/timezone'))

// ---------------------Profile-----------------------
app.all('/newprofile', authMiddleware,async (req, res) => {
  let profileq = `select * from userdata `;
  db.query(profileq, function (err, result) {
    res.render('alltask', { err: 'Login unsuccessfully....', result })
  })
})
// ----------------------Logout-----------------------
app.get('/logout',(req,res)=>{
  try {
    localStorage.clear()
    res.redirect('/login/login')
  } catch (error) {
    return res,end('Try again')
  }
})

app.all("*", (req, res) => {
  res.send("Not found data in database... &#128560;")
})
app.listen(port, () => {
  console.log(`Server run on port ${port}`)
})
