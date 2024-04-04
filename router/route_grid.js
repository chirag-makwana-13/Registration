const express = require('express')
const controller = require('../controller/grid/grid')
const router = express.Router();
router.get('/',controller.grid);
router.all('/dynamic/:pageno?', controller.dynamic);

module.exports = router