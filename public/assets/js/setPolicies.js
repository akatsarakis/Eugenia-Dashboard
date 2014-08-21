/**
* Set Policies chart.
**/
function setPolicies(){	
     	if(window.policies == undefined){return;}
	document.getElementById("Policies").innerHTML = "<p>" +
	    	"Defined :  " + window.policies.defined + " <br>"+
		"Used :  " + window.policies.used + "<br>";
}

//updates chart every 1 second.
setInterval( setPolicies, 1000 );
