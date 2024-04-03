const express = require('express')
const controller = require('../controller/attendance/attendance')
const router = express.Router();
router.get('/allstudent/:page',controller.allstudent);
router.get('/exam',controller.exam);
router.get('/report/:studentid',controller.report);
router.post('/search' ,controller.search);
router.post('/searchfilters' ,controller.searchfilter);
module.exports = router
