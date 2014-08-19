/**
* Sets volumes chart
**/
function setVolumes(){	

     	if(window.volumes == undefined){return;}
	document.getElementById("Volumes").innerHTML = "<p>" + 
	    	"Volumes :  " + window.volumes.volumes + "<br>"+
		"Online :  " + window.volumes.online + "<br>"+
		"Offline :  "+ window.volumes.offline +"<br>" +
		"Degraded :  "+ window.volumes.degraded +" <br>" +
		"</p>"+
		"<br><br><br><br><grey id=\"last_update\">Last Update: less than 3 seconds!</grey><br>";
}

//updates volumes chart every 1 second.
setInterval( setVolumes, 1000 );
