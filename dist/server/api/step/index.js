'use strict';

var express = require('express');
var controller = require('./step.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/today', controller.today);

module.exports = router;