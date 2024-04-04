const express = require('express')
const controller = require('../controller/jsonplaceholder/jsonplaceholder')
const router = express.Router();
router.get('/posts',controller.posts);
router.get('/posts/:id', controller.data);

module.exports = router