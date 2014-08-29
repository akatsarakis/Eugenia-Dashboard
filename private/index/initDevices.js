var fs = require('fs');
module.exports = initDevices;

var devices = new Object;
function initDevices( state ){
    devices = new Object;
    var used = [];
    var assigned = [];
    var assignedHost = [];
    devices.total = new Object ; 
    devices.total.flash = 0;
    devices.total.disks = 0;
    devices.assigned = new Object;
    devices.assigned.flash = 0;
    devices.assigned.disks = 0;
    devices.used = new Object;   
    devices.used.flash = 0;
    devices.used.disks = 0;

    for(var i = 0; i<state.nodes.length; i++){
	for(var j = 0; j<state.nodes[i].block_devices.length; j++){
	    if(state.nodes[i].block_devices[j].media == 'FLASH'){
		devices.total.flash++;
	    	if(state.nodes[i].block_devices[j].active == 1){
		    devices.assigned.flash++;
	    	    assigned.push(state.nodes[i].block_devices[j]);
		    assignedHost.push(state.nodes[i].host_guid);		    
		}
	    }else{
		devices.total.disks++;
		if(state.nodes[i].block_devices[j].active == 1){
		    devices.assigned.disks++;
		    assigned.push(state.nodes[i].block_devices[j]);
		    assignedHost.push(state.nodes[i].host_guid);
		}
	    }
	}
    }

    for(var i = 0; i<state.volumes.length; i++){
	for(var j = 0; j<state.volumes[i].targets.length; j++){
	    pushIfNotThere(state.volumes[i].targets[j],used,assigned,assignedHost);
	}
    }
    
    var str = JSON.stringify(devices);
    fs.writeFile('public/assets/data/Devices.json',str, function (err) {
	if (err) throw err;
	console.log('Devices saved!');
    });
};

function pushIfNotThere(target,used,assigned,assignedHost){
    var check = 0;
    for(var i = 0; i<used.length; i++){
	if(used[i] == (target.host_guid+target.block_device)){
		check = 1;
		break;
	}
    }
    if(check == 0){
	used.push(target.host_guid+target.block_device);
	for(var i = 0; i<assigned.length; i++){
	    if(target.host_guid == assignedHost[i] && target.block_device == assigned[i].name){
		if(assigned[i].media == 'FLASH'){
		    devices.used.flash++;
		}else{
		    devices.used.disks++;
		}
	    }
	}
    }
};
