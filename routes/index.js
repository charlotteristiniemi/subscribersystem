var express = require('express');
var router = express.Router();
var connection = require('../connection');

connection.connect(); //connect to database

/* Get the home page, and all the dialogues up to the current one. */
router.get('/', function(req, res) {
	res.sendStatus(200);
});


module.exports = router;