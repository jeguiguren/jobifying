
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
				dispJob(targets[count]);
			}
    	}
    }
	xhr.send(params);
}

function dispJob(thisJob) {
	var company = thisJob.company;
	var job = thisJob.job;
	var link = thisJob.link;
	var status = thisJob.status;

	if (company != undefined) {

		var out = "<li>COMPANY: " + company + "</li>";
		out += "<li>JOB: " + job + "</li>";
		out += "<li>LINK: " + link + "</li>";
		out += "<li>Status: " + status + "</li>";


		$("#job").append("<p>" + out + "</p>");

		var jstr = JSON.stringify(thisJob);
    }
}


