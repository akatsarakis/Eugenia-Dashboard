var systemStatus,
    capacity,
    devices,
    performance,
    policies,
    servers,
    volumes,
    targets,
    notyObj = [],
    preNotyLength = 0;


function getJson(){
    //read Status
    $.getJSON('assets/data/Status.json', function(data) {         
	systemStatus = data;
    });

    //read Capacity
    $.getJSON('assets/data/Capacity.json', function(data) {         
	capacity = data;
    });

    //read Devices
    $.getJSON('assets/data/Devices.json', function(data) {         
	devices = data;
    });


    $.getJSON('assets/data/Performance.json', function(data) {         
	performance = data;
    });

    $.getJSON('assets/data/Policies.json', function(data) {         
	policies = data;
    });

    $.getJSON('assets/data/Servers.json', function(data) {         
	servers = data;
    });

    $.getJSON('assets/data/Volumes.json', function(data) {         
	volumes = data;
    });

    //read Targets
    $.getJSON('assets/data/Targets.json', function(data) {         
	targets = data;
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
