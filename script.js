
var jobsURL = "http://localhost:8888/seeJobs";

var newJobURL = "http://localhost:8888/newJob";




function addJob() {
	alert("Adding Job");

	var params = "company=" + document.getElementById("company").value;
	params += "&job=" + document.getElementById("job").value;
	params += "&status=" + document.getElementById("status").value;
	params += "&link=" + document.getElementById("link").value;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", newJobURL, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() { //Call a function when the state changes.
    	if(xhr.readyState == 4 && xhr.status == 200) {
    		alert(xhr.responseText);
    	}
    	else {

    	}
    }
	xhr.send(params);
}

function dispJobs(category) {

	alert("in Dispjobs");
	alert(category);


	var xhr = new XMLHttpRequest();
	var params = "cssompany=google";
	xhr.open("POST", jobsURL, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() { //Call a function when the state changes.
    	if(xhr.readyState == 4 && xhr.status == 200) {
    		alert("YEAH!");
			info = xhr.responseText;				
			obj = JSON.parse(info);
			
			targets = obj.jobs;

			for (count in targets) {
				printJob(targets[count]);
			}
		}
		else {
	   		alert("Seems there's a server error");
    	}
    }
	xhr.send(params);
}

function printJob(thisJob) {
	var company = thisJob.company;
	var job = thisJob.job;
	var link = thisJob.link;
	var status = thisJob.status;

	if (company != undefined) {

		var out = "";
		out += "<p>Company: " + company + "</p>";
		out += "<p>Position: " + job + "</p>";
		out += "<p>Status: " + status + "</p>";
		out += "<p>Link: " + "<a href=" + link + ">Go to Site</a>" + "</p>";
		
		$("#job").append("<div class='floating-box'>" + out + "</div>");

		updates_or_drags();

    }
}


function updates_or_drags(){

	document.getElementById("myBtn").addEventListener("click", function(){
    	alert("Hello World!");
    	updates_or_drags();
	});


}


