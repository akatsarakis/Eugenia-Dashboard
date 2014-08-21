var fs = require('fs');
module.exports = initCapacity;

function initCapacity( state ){
    var capacity = new Object;
    capacity.provisioned = 0;
    capacity.metadata = 0;
    capacity.used = 0;
    capacity.replicas_space = 0;
    capacity.free = 0;
    capacity.physical = 0;  

    capacity.provisioned = state.provisioned;
    for(var i = 0; i<state.nodes.length; i++){
	for(var j = 0; j<state.nodes[i].block_devices.length; j++){
	    if (state.nodes[i].block_devices[j].active == 1){
		capacity.physical += Number(state.nodes[i].block_devices[j].capacity);
	    }
	}
    }
    capacity.metadata = capacity.physical * 0.001; 
    //capacity.used = capacity.physical * 0.63; // <<UNINITIALIZED>>
   // capacity.replicas_space = capacity.used * 0.66; // <<UNINITIALIZED>>

    for(var i =0; i<state.volumes.length;i++){
	var volumeUsedSpace = 0;
	for(var j =0; j<state.volumes[i].targets.length; j++){
	    volumeUsedSpace += Number(state.volumes[i].targets[j].statistics.eug_target_used);
	    capacity.used += Number(state.volumes[i].targets[j].statistics.eug_target_used);
	}
	capacity.replicas_space += volumeUsedSpace - (volumeUsedSpace *(1/state.volumes[i].replicas));
	console.log(capacity.used);
    }
    capacity.free = capacity.physical - capacity.used;

    var str = JSON.stringify(capacity);
    fs.writeFile('public/assets/data/Capacity.json',str, function (err) {
	if (err) throw err;
	console.log('Capacity saved!');
    });
}

