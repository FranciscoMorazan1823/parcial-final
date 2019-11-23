var express = require('express');
var router = express.Router();

var indexController = require("../controllers/indexcontroller");

/* GET home page. */
router.get('/', indexController.main);
router.get('/adminWatchs', indexController.adminwatchs);

module.exports = router;
