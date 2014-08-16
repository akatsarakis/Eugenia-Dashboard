var fs = require('fs');
module.exports = initVolumesTable;

function initVolumesTable( state ){
    var volumesTable = new Object;
    volumesTable.name = [];
    volumesTable.volume_guid = [];
    volumesTable.capacity = [];
    volumesTable.replicas = [];
    volumesTable.policy_id = [];
    volumesTable.active = [];
    volumesTable.max_target_core_index = [];
    volumesTable.noTargets = [];
    for(var i = 0; i<state.volumes.length; i++){
	volumesTable.name[i] = state.volumes[i].name;
	volumesTable.volume_guid[i] = state.volumes[i].volume_guid;
	volumesTable.capacity[i] = state.volumes[i].capacity;
	volumesTable.replicas[i] = state.volumes[i].replicas;
	volumesTable.policy_id[i] = state.volumes[i].policy_id;
	volumesTable.active[i] = state.volumes[i].active;
	volumesTable.max_target_core_index[i] = state.volumes[i].max_target_core_index;
	volumesTable.noTargets[i] = state.volumes[i].noTargets;
    }
    var str = JSON.stringify(volumesTable);
    fs.writeFile('public/assets/data/VolumesTable.json',str, function (err) {
	if (err) throw err;
	console.log('Volumes Table saved!');
    });
};

