var express = require('express');
var router = express.Router();

const adminWatchs = require('../controllers/watchController')

/* GET home page. */
router.get('/', adminWatchs.getWatchs);
router.get('/:id', adminWatchs.getwatch);
router.post("/", adminWatchs.createwatch);
router.put("/", adminWatchs.updatewatch);
router.delete("/",adminWatchs.deletewatch);


module.exports = router;
