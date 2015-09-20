'use strict';

var express = require('express');
var controller = require('./calories.controller');

var router = express.Router();

router.get('/today', controller.today);

module.exports = router;