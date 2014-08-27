/**
* Set servers chart.
**/
function setServers(){	
     	if(window.servers == undefined){return;}
	document.getElementById("ServersOnline").innerHTML = "Total: " + window.servers.servers +
	    					"<br /> Assigned: " + window.servers.assigned;
}

//updates every 1 second.
setInterval( setServers, 1000 );
