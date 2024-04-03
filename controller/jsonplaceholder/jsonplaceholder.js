const express = require('express')
const router = express.Router()
const db = require('../../db')

router.get('/posts', (req, res) => {
    try {
        res.render('jsonplaceholder/allstudent') 
    } catch (error) {
      res.write("Try again ")
      return res.end()
    }
  })
  
  // 2. /posts/id
  
  router.get('/posts/:id', (req, res) => {
    try {
        res.render('jsonplaceholder/post', { id: req.params.id })
    } catch (error) {
      res.write("Try again ")
      return res.end()
    }
  })
  module.exports = router