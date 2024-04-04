const express = require('express')
const controller = require('../controller/ajaxjobapplicaiton/ajaxjobapplicaiton')
const router = express.Router();
router.get('/home',controller.home);
router.get('/form/:id',  controller.form);
router.post('/basic',controller.basic);
router.post('/eduction', controller.eduction);
router.post('/work',controller.work);
router.post('/language', controller.language);
router.post('/technology',controller.technology);
router.post('/referance1', controller.referance1);
router.post('/preferance1', controller.preferance1);
router.post('/updatebasic', controller.updatebasic);
router.post('/updateeduction',controller.updateeduction);
router.post('/updatework', controller.updatework);
router.post('/updatereferance1', controller.updatereferance1);
router.post('/updatepreferance1', controller.updatepreferance1);
router.get('/home/:id',controller.update);
module.exports = router