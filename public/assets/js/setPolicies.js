/**
* Set Policies chart.
**/
function setPolicies(){	
     	if(window.policies == undefined){return;}
	document.getElementById("Policies").innerHTML = "<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
	        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; POLICIES:" +
	    	"&nbsp;&nbsp;&nbsp;&nbsp; Defined :  " + window.policies.defined +
		"&nbsp;&nbsp;&nbsp;&nbsp; Used :  " + window.policies.used + "</p>";
}

//updates chart every 1 second.
setInterval( setPolicies, 1000 );
