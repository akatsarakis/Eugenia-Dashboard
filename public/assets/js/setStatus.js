/**
* Set status chart.
**/
function setStatus(){	

     	if(window.systemStatus == undefined){return;}
	document.getElementById("Status").innerHTML = "<p>"+
		"Servers :  " + window.systemStatus.servers + "<br>"+
		"Devices :  "+ window.systemStatus.devices +"<br>" +
		"Volumes :  "+ window.systemStatus.volumes +" <br>" +
		"IO erros :  "+ window.systemStatus.IO_errors+" *<br>" +
		"Last System Start :  "+ window.systemStatus.last_system_start +" <br>" + "</p>"+
		"<br><grey id=\"last_update\">Last Update: less than 3 seconds!</grey><br>";
}

//updates status chart every 1 sec.
setInterval( setStatus, 1000 );
