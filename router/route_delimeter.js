const express = require('express')
const controller = require('../controller/delimeter/delimeter')
const router = express.Router();
router.get('/allstudent/:page',controller.allstudent);
router.post('/delimeter', controller.delimeter);

module.exports = router