var fs = require('fs');
module.exports = initDevices;

function initDevices( state ){
    var devices = new Object;
    var used = [];
    devices.devices = 0 ; 
    devices.assigned = 0; // (active 0)
    devices.used = 0;   // auta pou apoteloun targets
    devices.rotating = 0; 	// <<UNINITIALIAZED>>
    devices.non_rotating = 0; // <<UNINITIALIAZED>
    for(var i = 0; i<state.nodes.length; i++){
	devices.devices += state.nodes[i].block_devices.length;
	//devices.devices += state.nodes[i].nics.length;
	for(var j = 0; j<state.nodes[i].block_devices.length; j++){
	    if(state.nodes[i].block_devices[j].active == 1){
		devices.assigned++;
	    }
	}
	/*for(var j = 0; j<state.nodes[i].nics.length; j++){
	    if(state.nodes[i].nics[j].active == true){
		devices.assigned++;
	    }
	}*/
    }
    for(var i = 0; i<state.volumes.length; i++){
	for(var j = 0; j<state.volumes[i].targets.length; j++){
	    pushIfNotThere(state.volumes[i].targets[j],used);
	}
    }
    
    devices.used = used.length;   
    var str = JSON.stringify(devices);
    fs.writeFile('public/assets/data/Devices.json',str, function (err) {
	if (err) throw err;
	console.log('Devices saved!');
    });
};

function pushIfNotThere(target,used){
    var check = 0;
    for(var i = 0; i<used.length; i++){
	if(used[i] == (target.host_guid+target.block_device)){
		check = 1;
		break;
	}
    }
    if(check == 0){
	used.push(target.host_guid+target.block_device);
    }
};
