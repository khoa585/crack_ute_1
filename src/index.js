const express = require('express')
const login = require('./server/users')
const router = express.Router();
router.use('/',login)
module.exports =  router;
