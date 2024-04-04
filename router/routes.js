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
const gridRoute = require('./route_grid')
const jsonRoute = require('./route_jsonplaceholder')
const studentfilecrudRoute= require('./route_studentfilecrud')
const ajaxapplicationRoute = require('./route_ajaxjobapplication')
const registerRoute =require('./route_register')
const loginRoute = require('./route_login')
const forgotpasswordRoute = require('./route_forgotpassword')
const profileRoute = require('./route_profile')
const router = express.Router()
//***************************  All router  ********************************
//----------------Registration and Login----------
router.use('/', registerRoute)
router.use('/login', loginRoute)
router.use('/forgotpassword', forgotpasswordRoute)
router.use('/', authMiddleware, profileRoute)

//----------------Student CRUD opration------------
router.use('/student', authMiddleware, studentfilecrudRoute)
router.use('/studentdb', authMiddleware, studentcruddbRoute)
router.use('/attendance', authMiddleware, attendanceRoute)
router.use('/delimeter', authMiddleware,delimeterRoute)
router.use('/grid', authMiddleware, gridRoute)

//----------------Job Application Form--------------
router.use('/jobapplicaiton', authMiddleware,jobapplicationRoute)
router.use('/ajaxjobapplicaiton', authMiddleware, ajaxapplicationRoute)
router.use('/jsonplaceholder', authMiddleware, jsonRoute)
// ----------------Tasks-----------------------------
router.use('/dynamictable', authMiddleware, require('../controller/dynamictable/dynamictable'))
router.use('/kukucube', authMiddleware, require('../controller/kukucube/kukucube'))
router.use('/tictactoe', authMiddleware, require('../controller/tictactoe/tictactoe'))
router.use('/jsevent', authMiddleware, require('../controller/jsevent/jsevent'))
router.use('/timezone', authMiddleware, require('../controller/timezone/timezone'))

//----------------Html and Css Task----------------
router.use('/html1', authMiddleware, require('../controller/html1/html1'))
router.use('/html2', authMiddleware, require('../controller/html2/html2'))
router.use('/html3', authMiddleware, require('../controller/html3/html3'))

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
