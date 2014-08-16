//is used for checking the differences between the state and preState
//objects and create notifications for their differences!
var firstTime = true;
function setNoty(){
    if(window.firstTime){ return; }
    var i =  window.notyObj.length - window.preNotyLength;

    for(var j = 0; j < i; j++){
	var sort = notyObj[window.preNotyLength + j];
	var type;
	  if(sort.active == "ONLINE_HEALTHY" || sort.active == "TARGET_ONLINE"){
	  	type = "success";
	  }else if(sort.active == "ONLINE_DEGRADED" || sort.active == "TARGET_OFFLINE_LOST"){
	  	type = "error";
	  }else if(sort.active == "OFFLINE_DEGRADED"){
	      	type = "warning";
	  }else{
	      	type = "info";
	  }
	noty({"text":sort.device+": "+sort.name+" "+
	    sort.message+" has been "+sort.active,"layout":"topRight",
	    "type":type,"timeout":"8000"});
     	window.newNoty = true;
	/*if(document.URL.split('/')[3] == "activity.html"){
	    setActivityTable();
	}else if(document.URL.split('/')[3] == "volumes.html"){
	    setVolumesTable();
	}else if(document.URL.split('/')[3] == "targets.html"){
	    setTargetsTable();
	}*/
    }
     window.preNotyLength = window.notyObj.length;
};

setInterval(setNoty, 1000);

