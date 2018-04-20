const express = require('express')
const PORT = process.env.PORT || 8888
const bodyParser = require('body-parser');
const validator = require('validator');
const mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/companies';
const MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

const dbcoll = "jobapps";


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
	db.collection(dbcoll, function(er, collection) {

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

	console.log("Posting to /jobs");
	console.log(request.body);

	var newJob = {};
	newJob.company = request.body.company;
	newJob.job = request.body.job;
	newJob.link = request.body.link;
	newJob.stat = request.body.status;


	if (newJob.company != undefined && newJob.job != undefined && newJob.link != undefined && newJob.stat != undefined) {
		db.collection(dbcoll, function(error, coll) {

			coll.insert(newJob, function(error, saved) {
				if (error) {
					console.log("Error: " + error);
					response.send(500);
				}
				else {
					response.send("JOB added to DB ! " + newJob);
				}
			});
		});
	}
	else {
		response.send('{"error":"Whoops, something is wrong with your data!"}');
	}		
})



.post('/seeJobs', function (request, response) {

	console.log("Posting to /seeJobs");

	var comp = request.body.company;
	var seeAll = (request.body.company == undefined);
	var out = {};

	if (seeAll) {
		console.log("Showing ALL results");
		
		db.collection(dbcoll, function(er, collection) {
			collection.find().toArray(function(err, results) {
				if (!err) {
					out["jobs"] = results;
					console.log("ALL: " + results[0]);
					response.send(out);
				} else {
					response.send('<!DOCTYPE HTML><html><head><title>DB</title></head><body><h1>ERROR displaying Passenger DB</h1></body></html>');
				}
			});
		});
	}
	else {
		db.collection(dbcoll, function(er, collection) {
			collection.find( { company: comp } ).toArray(function(err, results) {
				if (!err) {
					out["jobs"] = results;
					console.log(comp + ": " + results[0]);
					response.send(out);
				} else {
					response.send('<!DOCTYPE HTML><html><head><title>DB</title></head><body><h1>ERROR displaying Passenger DB</h1></body></html>');
				}
			});
		});
	}
})


.listen(PORT)


