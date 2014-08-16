var fs = require('fs');
module.exports = initSystemStatus;

function initSystemStatus( state ){
    var systemStatus = new Object;
    systemStatus.servers = state.nodes.length; 	//(nodes)
    systemStatus.devices = 0;   //(targets)
    systemStatus.last_system_start = state.last_system_start; 
    systemStatus.volumes = state.volumes.length; 	//(volumes);
    
    for(var i = 0; i<state.nodes.length; i++){
	systemStatus.devices += state.nodes[i].block_devices.length;
    }

    systemStatus.IO_errors = 0; // <<UNINITIALIZED>>
    var str = JSON.stringify(systemStatus);
    fs.writeFile('public/assets/data/Status.json',str, function (err) {
	if (err) throw err;
	console.log('Status saved!');
    });
};

