const express = require('express')
const controller = require('../controller/studentcruddb/studentcruddb')
const router = express.Router();
router.get('/allstudent/:page',controller.allstudent);
router.get('/allstudent/:page/:field/:order',controller.pagging);
module.exports = router
