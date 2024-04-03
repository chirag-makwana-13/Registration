const express = require('express')
const controller = require('../controller/jobapplicaiton/jobapplicaiton')
const router = express.Router();
router.get('/home',controller.home);
router.post('/form', controller.form);
router.get('/form/:id',controller.particulardata);
router.post('/update',controller.update);
module.exports = router
