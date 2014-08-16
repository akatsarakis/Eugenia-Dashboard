localStorage.search = "";

function setVolumesTable(){
    var table = $('#volumesTable').DataTable();
    $('#volumesTable').dataTable().fnClearTable();
    if(window.volumesTable == undefined){ return; }
    for(var i = 0; i < window.volumesTable.name.length; i++){
	var sort = window.volumesTable;
	var a = table.fnAddData([sort.name[i],sort.volume_guid[i],mb2Gb(sort.capacity[i]).toFixed(2) + " GB",
		sort.replicas[i],sort.policy_id[i],sort.active[i],sort.noTargets[i]]);
    }
    var rows = document.getElementById('volumesTable').getElementsByTagName('tr');
    for( var i = 1; i < rows.length; i++){
	if(rows[i].cells[5].innerHTML == "ONLINE_HEALTHY"){
	    rows[i].className = "green";
	}else if(rows[i].cells[5].innerHTML == "ONLINE_DEGRADED"){
	    rows[i].className = "red";
	}else if(rows[i].cells[5].innerHTML == "OFFLINE_HEALTHY"){
	    rows[i].className = "brown";
	}else if(rows[i].cells[5].innerHTML == "UNINITIALIZED"){
	    rows[i].className = "grey";
	}else if(rows[i].cells[5].innerHTML == "OFFLINE_AUTO_SHUT"){
	    rows[i].className = "purple";
	}else if(rows[i].cells[5].innerHTML == "SHUTTING_DOWN"){
	    rows[i].className = "yellow";
	}else if(rows[i].cells[5].innerHTML == "OFFLINE_DEGRADED"){
	    rows[i].className = "orange";
	}



	if(i%2 == 0){
	    rows[i].className += " even";
	}else{
	    rows[i].className += " odd";
	}
	$(rows[i]).click(function() {
	    localStorage.search = this.cells[0].innerHTML;
	    location.href = 'targets.html';
	});
    }

}

setInterval( setVolumesTable , 1000);


function mb2Tb(mb_size){
    return mb_size * 9.53674316 * Math.pow(10, -7);
}
//transform mb to tb
function mb2Gb(mb_size){
    return mb_size * 9.765625  * Math.pow(10, -4);
}
