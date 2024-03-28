const express = require('express')
const router = express.Router()
const db = require('../../db')
router.get('/', (req, res) => {
    res.render('timezone/timezone');
    // res.render('application',{data:''});
  })
  module.exports = router