const express = require('express')
const app = express()
const port = 3003
const bodyParser = require("body-parser"); 
// const db = require('./db')
const path = require('path');
var crypto = require("crypto");
require("dotenv").config()
const router =require("./router/routes")
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

app.use("/",router)

app.all("*", (req, res) => {
  res.send("Not found data in database... &#128560;")
})
app.listen(process.env.PORT, () => {
  console.log(`Server run on port ${process.env.PORT}`)
})
