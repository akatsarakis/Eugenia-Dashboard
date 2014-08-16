var fs = require('fs');
module.exports = initCapacity;

function initCapacity( state ){
    var capacity = new Object;
    capacity.provisioned = 0; // <<UNINITIALIZED>>
    capacity.physical = 0;  
    for(var i = 0; i<state.nodes.length; i++){
	for(var j = 0; j<state.nodes[i].block_devices.length; j++){
	    if (state.nodes[i].block_devices[j].active == 1){
		capacity.physical += Number(state.nodes[i].block_devices[j].capacity);
	    }
	}
    }
    capacity.used = capacity.physical * 0.63; // <<UNINITIALIZED>>
    capacity.replicas_space = capacity.used * 0.66; // <<UNINITIALIZED>>
    capacity.free = capacity.physical - capacity.used;

    var str = JSON.stringify(capacity);
    fs.writeFile('public/assets/data/Capacity.json',str, function (err) {
	if (err) throw err;
	console.log('Capacity saved!');
    });
}

