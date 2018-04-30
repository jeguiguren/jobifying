
//var jobsURL = "http://localhost:3000/getJob";
//var newJobURL = "http://localhost:3000/setJob";
//var clearURL = "http://localhost:3000/clear";

var jobsURL = "https://jobifying.herokuapp.com/getJob";
var newJobURL = "https://jobifying.herokuapp.com/setJob";
var clearURL = "https://jobifying.herokuapp.com/clear";



function addJob() {
	var params = "company=" + document.getElementById("company").value;
	params += "&job=" + document.getElementById("job").value;
	params += "&status=" + document.getElementById("status").value;
	params += "&link=" + document.getElementById("link").value;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", newJobURL, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() { //Call a function when the state changes.
    	if(xhr.readyState == 4 && xhr.status == 200) {
    		//alert(xhr.responseText);
    		location.reload();
    	}
    }
	xhr.send(params);
}

function dispJobs(category) {

	//alert("in Dispjobs");
	//alert(category);
	var params = "status=" + category;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", jobsURL, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() { //Call a function when the state changes.
    	if(xhr.readyState == 4 && xhr.status == 200) {

    		var elem = document.getElementById('toRemove');
			elem.parentNode.removeChild(elem);
    		alert("YEAH!");
			info = xhr.responseText;				
			obj = JSON.parse(info);
			
			targets = obj.jobs;

			for (count in targets) {
				printJob(targets[count]);
			}
		}
    }
	xhr.send(params);
}

function printJob(thisJob) {

	var id = thisJob._id
	var company = thisJob.company;
	var job = thisJob.job;
	var link = thisJob.link;
	var status = thisJob.status;

	if (company != undefined) {

		var out = "";
		out += "<p hidden>ID: " + id + "</p>";
		out += "<p>Company: " + company + "</p>";
		out += "<p>Position: " + job + "</p>";
		out += "<p>Status: " + status + "</p>";
		out += "<p><a href=" + link + ">Go to Site</a>" + "</p>";
		out += "<p><button class='but2' onclick='removeJob()' value=" + id + ">Remove</button></p>";
		
		$(".jobList").append("<div class='jobElem'>" + out + "</div>");
    }
}




function clearAll() {

	var xhr = new XMLHttpRequest();
	xhr.open("GET", clearURL, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() { //Call a function when the state changes.
    	if(xhr.readyState == 4 && xhr.status == 200) {
    		var info = xhr.responseText;
    		alert(info);
    		dispJobs();
    	}
    }
	xhr.send();
}

