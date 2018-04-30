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



.post('/setJob', function (request, response) {

	console.log("Posting to /jobs");
	console.log(request.body);

	var newJob = {};
	newJob.company = request.body.company;
	newJob.job = request.body.job;
	newJob.link = request.body.link;
	newJob.status = request.body.status;


	if (newJob.company != undefined && newJob.job != undefined && newJob.link != undefined && newJob.status != undefined) {
		db.collection(dbcoll, function(error, coll) {
			coll.insert(newJob, function(error, saved) {
				if (error) {
					console.log("Error: " + error);
					response.send(500);
				}
				else {
					response.send("Job accepted! Thank you");
				}
			});
		});
	}
	else {
		response.send("Whoops, something is wrong with your data!");
	}		
})



.post('/getJob', function (request, response) {

	console.log("Posting to /getJob");

	var categ = request.body.status;

	console.log(categ);
	var out = {};


	if (categ != "Accepted" && categ != "Applied") {
		categ = true;
	}
	db.collection(dbcoll, function(er, collection) {
		collection.find().toArray(function(err, results) {
			if (!err) {
				out["jobs"] = results;
				console.log(results);
				response.send(out);
			} 
			else {
				response.send("Error accessing data base");

			}				
		});
	});
	
})

.get('/clear',function(req,res){
	console.log("clearing"); 
	db.collection(dbcoll, function(er, collection) {
		collection.remove(function(err, results) {
			if (!err) {
				res.send("Data base emptied!");
			} 
			else {
				res.send("Error accessing data base");

			}				
		});
	});
})


.get('/',function(req,res){
	console.log("in /");
    res.sendFile('/index.html',  { root: __dirname });
})

.get('/seeJobs',function(req,res){
	console.log("in /seeJobs");
     res.sendFile('/seeJobs.html', { root: __dirname });
})

.get('/newJob',function(req,res){
	console.log("in /newJob");
     res.sendFile('/newJob.html',  { root: __dirname });
})


.listen(PORT)


