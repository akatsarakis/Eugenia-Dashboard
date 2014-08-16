//called from setTargets
function setActivityTable(){

    var table = $('#activityTable').DataTable();
    $('#activityTable').dataTable().fnClearTable();
    for(var i = 0; i < window.notyObj.length; i++){
	var sort = window.notyObj[i];
	var a = table.fnAddData([sort.device,sort.name,sort.message,
		sort.active,sort.time_stamp]);
    }
    var rows = document.getElementById('activityTable').getElementsByTagName('tr');
    
    if(rows[1].innerText == "No data available in table") { return ; }

    for( var i = 1; i < rows.length; i++){
	if(rows[i].cells[3].innerHTML == "JOINED EUGENIA" ||
		rows[i].cells[3].innerHTML == "ONLINE_HEALTHY" ||
		rows[i].cells[3].innerHTML == "TARGET_ONLINE"){

	    		rows[i].className = "green";

	}else if(rows[i].cells[3].innerHTML == "UNINITIALIZED" ||
		  rows[i].cells[3].innerHTML == "TARGET_UNINITIALIZED"){
	   		
		     	rows[i].className = "grey";

	}else if(rows[i].cells[3].innerHTML == "ONLINE_DEGRADED" ||
		  rows[i].cells[3].innerHTML == "TARGET_OFFLINE_LOST" ||
		  rows[i].cells[3].innerHTML == "REMOVED FROM EUGENIA"){
			
		      rows[i].className = "red";

	}else if(rows[i].cells[3].innerHTML == "SHUTTING_DOWN" ||
		  rows[i].cells[3].innerHTML == "TARGET_SHUTTING_DOWN"){
	   		
		     	rows[i].className = "yellow";
	
	}else if(rows[i].cells[3].innerHTML == "OFFLINE_HEALTHY" ||
		  rows[i].cells[3].innerHTML == "TARGET_OFFLINE_HEALTHY"){
	   		
		     	rows[i].className = "brown";
			
	}else if(rows[i].cells[3].innerHTML == "TARGET_INITIALIZING"){

	    		rows[i].className = "blue";

	}else if(rows[i].cells[3].innerHTML == "OFFLINE_DEGRADED"){

	    		rows[i].className = "orange";

	}else if(rows[i].cells[3].innerHTML == "OFFLINE_AUTO_SHUT"){

	    		rows[i].className = "purple";

	}



	if(i%2 == 0){
	    rows[i].className += " even";
	}else{
	    rows[i].className += " odd";
	}
    }
}

setInterval(setActivityTable ,1000);

