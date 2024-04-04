const express = require('express')
const controller = require('../controller/studentscrudfile/studentfilecrud')
const router = express.Router();
router.get('/',controller.home);
router.post('/form', controller.form);
router.get('/user', controller.data);
router.get('/user/:id', controller.paticulardata);

module.exports = router