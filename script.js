
var jobsURL = "http://localhost:8888/getJob";

var newJobURL = "http://localhost:8888/setJob";




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
    		alert(xhr.responseText);
    		location.reload();
    	}
    }
	xhr.send(params);
}

function dispJobs(category) {

	alert("in Dispjobs");
	alert(category);
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

	var id = thisJob.id
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
		out += "<p>Link: " + "<a href=" + link + ">Go to Site</a>" + "</p>";

		//document.write(out);

		
		$(".jobList").append("<div class='floating-box'>" + out + "</div>");
    }
}

