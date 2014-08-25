/**
* Set servers chart.
**/
function setServers(){	
     	if(window.servers == undefined){return;}
	document.getElementById("ServersOnline").innerHTML = window.servers.servers+ "  Servers Online";
}

//updates every 1 second.
setInterval( setServers, 1000 );
