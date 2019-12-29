var controller = require('../controllers/authController.js');
var express = require('express');
var router = express.Router();


router.post('/', controller.login);

module.exports = router;