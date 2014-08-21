/**
* Set servers chart.
**/
function setServers(){	
     	if(window.servers == undefined){return;}
	document.getElementById("Servers").innerHTML = "<p>" +
	    	"Servers:  " + window.servers.servers + "<br>"+
		"Storage Servers :  " + window.servers.storage_servers + "*<br>"+
		"CPU util :  "+ window.servers.CPU_util +"%  *<br>" +
		"Memory util :  "+ window.servers.memory_util +"%  *<br>" + "</p>";
}

//updates every 1 second.
setInterval( setServers, 1000 );
