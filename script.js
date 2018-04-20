
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

			alert("Targets: " + targets);
			var out = "";
	
			for (count in targets) {
				out += targets[count].company + "  ";
			}
			document.getElementById("demo").innerHTML = out;
    	}
    }
	xhr.send(params);
}