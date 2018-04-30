
////////////////////////////////////////

var express = require('express');

var bodyParser = require('body-parser'); 
var validator = require('validator'); 
var app = express();
var dbcoll = "jobapps";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nodemongoexample';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

// Serve static content
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',function(req,res){
	console.log("in /");
    res.sendFile('/index.html',  { root: __dirname });
});

app.get('/seeJobs',function(req,res){
	res.send("/seeJobs WORKS");
});

app.get('/newJob',function(req,res){
	res.send("/newJob WORKS");
	console.log("in /newJob");
     res.sendFile('/newJob.html',  { root: __dirname });
});


app.post('/setJob', function (request, response) {

	res.send("posting to /setJob WORKS");
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
});



app.post('/getJob', function (request, response) {

	res.send("posting to /getJob WORKS");

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
	
});

app.get('/clear',function(req,res){

	res.send("get to /clear WORKS");
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
});


app.listen(process.env.PORT || 3000);


