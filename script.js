
var jobsURL = "http://localhost:8888/seeJobs";


function dispJobs() {

	alert("in Dispjobs");

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

		// <a href="http://www.yahoo.com">here</a>
		
		$("#job").append("<div class='floating-box'>" + out + "</div>");

		var jstr = JSON.stringify(thisJob);
    }
}


