const express = require('express')
const app = express()
const db = require('../db')
const path = require('path');
require("dotenv").config()
const { authMiddleware, verifyLoginMiddleware } = require('../middleware/auth')
app.set('view engine', 'ejs');
app.use(express.json())
const localStorage = require('localStorage');
app.use(express.static(path.join(__dirname, 'public')))
const studentcruddbRoute = require('./route_studentcruddb')
const attendanceRoute = require('./route_attendnce')
const delimeterRoute = require('./route_delimeter')
const jobapplicationRoute = require('./route_jobapplication')
const router = express.Router()
//***************************  All router  ********************************
//----------------Registration and Login----------
router.use('/', require('../controller/register/register'))
router.use('/login', require('../controller/login/login'))
router.use('/forgotpassword', require('../controller/forgotpassword/forgotpassword'))
router.use('/profile', require('../controller/profile/profile'))

//----------------Dyanmic table--------------------
router.use('/dynamictable', authMiddleware, require('../controller/dynamictable/dynamictable'))

//----------------Kuku cube------------------------
router.use('/kukucube', authMiddleware, require('../controller/kukucube/kukucube'))

//----------------Tic-Tac-Toe----------------------
router.use('/tictactoe', authMiddleware, require('../controller/tictactoe/tictactoe'))

//----------------Js Event-------------------------
router.use('/jsevent', authMiddleware, require('../controller/jsevent/jsevent'))

//----------------Html and Css Task----------------
router.use('/html1', authMiddleware, require('../controller/html1/html1'))
router.use('/html2', authMiddleware, require('../controller/html2/html2'))
router.use('/html3', authMiddleware, require('../controller/html3/html3'))

//----------------Student CRUD opration------------
router.use('/student', authMiddleware, require('../controller/studentscrudfile/studentfilecrud'))
router.use('/studentdb', authMiddleware, studentcruddbRoute)
router.use('/attendance', authMiddleware, attendanceRoute)
router.use('/delimeter', authMiddleware,delimeterRoute)
router.use('/grid', authMiddleware, require('../controller/grid/grid'))

//----------------Job Application Form--------------
router.use('/jobapplicaiton', authMiddleware,jobapplicationRoute)
router.use('/ajaxjobapplicaiton', authMiddleware, require('../controller/ajaxjobapplicaiton/ajaxjobapplicaiton'))
router.use('/jsonplaceholder', authMiddleware, require('../controller/jsonplaceholder/jsonplaceholder'))

//----------------Time Zone--------------------------
router.use('/timezone', authMiddleware, require('../controller/timezone/timezone'))

// ---------------------Profile-----------------------
router.all('/newprofile', authMiddleware, async (req, res) => {
    let profileq = `select * from userdata `;
    db.query(profileq, function (err, result) {
        res.render('alltask', { err: 'Login unsuccessfully....', result })
    })
})
// ----------------------Logout-----------------------
router.get('/logout', (req, res) => {
    try {
        localStorage.clear()
        res.redirect('/login/login')
    } catch (error) {
        return res, end('Try again')
    }
})

module.exports = router;
