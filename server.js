const express = require('express')
const PORT = process.env.PORT || 8888
const bodyParser = require('body-parser');
const validator = require('validator');
const mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/companies';
const MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});


express()

	.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	})
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))

	.get('/', function (request, response) {

		console.log("IN GET");
		response.set('Content-Type', 'text/html');
		var indexPage = '';

		// Line 50: equivalent to `db.fooditems` in MongoDB client shell
		db.collection('companies', function(er, collection) {

			// Line 53: equivalent to `db.fooditems.find()` in MongoDB client shell
			collection.find().toArray(function(err, results) {

				// All results of db.fooditems.find() will go into...
				// ...`results`.  `results` will be an array (or list)
				if (!err) {
					indexPage += "<!DOCTYPE HTML><html><head><title>What Did You Feed Me?</title></head><body><h1>What Did You Feed Me?</h1>";
					for (var count = 0; count < results.length; count++) {
						indexPage += "<p>You fed me " + results[count].company + "!</p>";
					}
					indexPage += "</body></html>"
					response.send(indexPage);
				} else {
					response.send('<!DOCTYPE HTML><html><head><title>What Did You Feed Me?</title></head><body><h1>Whoops, something went terribly wrong!</h1></body></html>');
				}
			});
		});

		
	})
	.post('/jobs', function (request, response) {

		console.log(request.body);
		var comp = request.body.company;
		//foodItem = foodItem.replace(/[^\w\s]/gi, ''); // remove all special characters.  Can you explain why this is important?
		var toInsert = {
			"company": comp,
		};
		db.collection('companies', function(error, coll) {
			coll.insert(toInsert, function(error, saved) {
				if (error) {
					console.log("Error: " + error);
					response.send(500);
				}
				else {
					response.send('<html><head><title>Thanks!</title></head><body><h2>Thanks for your submission!</h2></body></html>');
				}
		    });
		});
	})
.listen(PORT)


