var targetsTable,
    notyObj = [],
    preNotyLength = 0;


function getJson(){
    //read Status
    $.getJSON('assets/data/TargetsTable.json', function(data) {         
	targetsTable = data;
    });

    preNotyLength = notyObj.length;
    //read Noty
    $.getJSON('assets/data/Noty.json', function(data) {         
	notyObj = data;
	if(window.firstTime){
	    window.preNotyLength = window.notyObj.length;
	    window.firstTime = false;
	}
    });

}

setInterval(getJson,1500);
