var express = require('express');
var router = express.Router();
var connection = require('../connection');

connection.connect(); //connect to database

/* Get the home page, and all the dialogues up to the current one. */
router.get('/getSubscriberData/:subNr', function(req, res) {
	var subNr = req.params.subNr;

	connection.query( 'SELECT * FROM tbl_prenumeranter WHERE pr_prenumerationsnummer = ' + subNr, function(err, row, field) {
		if (err) console.log(err);
		if (row[0] == undefined) {
			res.sendStatus(404);
		}
		else {
			res.send(row[0])
		}
	});
});


module.exports = router;