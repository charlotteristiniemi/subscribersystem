var express = require('express');
var router = express.Router();
var connection = require('../connection');

connection.connect(); //connect to database

/* 
 * GET subscriber data by id, send to ads system
 */

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


/* 
 * PUT subscriber data, send to ads system
 */

router.put('/putSubscriberData/:name/:phone/:address/:postalnumber/:city/:id', function(req, res) {
	var namn = req.params.name;
	var tel = req.params.phone;
	var utdAd = req.params.address;
	var postnr = req.params.postalnumber;
	var ort = req.params.city;
	var id = req.params.id;

	connection.query( "CALL UpdateSubscriber('"+namn+"', '"+utdAd+"', "+postnr+", '"+ort+"', "+tel+", "+id+")", function(err1, row1, field1) {
		if (err1) console.log(err1);
		connection.query( 'SELECT * FROM tbl_prenumeranter WHERE pr_id = ' + id, function(err2, row2, field2){
			if (err2) console.log(err2);
			if (row2[0] == undefined) {
				res.sendStatus(404);
			}
			else {
				res.send(row2[0])
			}
		});
	});
});


module.exports = router;