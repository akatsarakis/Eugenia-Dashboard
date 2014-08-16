var newNoty = true;

function setTargetsTable(){
    if(!window.newNoty){ return ; }
    var table = $('#targetsTable').DataTable();
    $('#targetsTable').dataTable().fnClearTable();
    if(window.targetsTable == undefined){ return; }
    for(var i = 0; i < window.targetsTable.targets.length; i++){
	var sort = window.targetsTable.targets[i];
	var a = table.fnAddData([sort.host_guid,sort.nic_guid,sort.block_device,
		sort.port,sort.active,window.targetsTable.volumes[i]]);
    }
    var rows = document.getElementById('targetsTable').getElementsByTagName('tr');
    for( var i = 1; i < rows.length; i++){
	if(rows[i].cells[4].innerHTML == "TARGET_ONLINE"){
	    rows[i].className = "green";
	}else if(rows[i].cells[4].innerHTML == "TARGET_OFFLINE_LOST"){
	    rows[i].className = "red";
	}else if(rows[i].cells[4].innerHTML == "TARGET_OFFLINE_HEALTHY"){
	    rows[i].className = "brown";
	}else if(rows[i].cells[4].innerHTML == "TARGET_UNINITIALIZED"){
	    rows[i].className = "grey";
	}else if(rows[i].cells[4].innerHTML == "TARGET_INITIALIZING"){
	    rows[i].className = "blue";
	}else if(rows[i].cells[4].innerHTML == "TARGET_SHUTTING_DOWN"){
	    rows[i].className = "yellow";
	}


	if(i%2 == 0){
	    rows[i].className += " even";
	}else{
	    rows[i].className += " odd";
	}
    }
   


}

$(document).ready( function() {
    if(document.referrer == "http://127.0.0.1:1340/volumes.html"){
  	$('#targetsTable').dataTable( {
    		"oSearch": {"sSearch": localStorage.search}
  	} );
    }else{
	$('#targetsTable').dataTable( {
    		"oSearch": {"sSearch": ""}
  	} );
    }
} )

setInterval( setTargetsTable , 1000);
