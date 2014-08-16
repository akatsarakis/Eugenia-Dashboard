var fs = require('fs'),
    Target = require('../objects.js').Target;
    module.exports = initTargetsTable;

function initTargetsTable( state ){
    var targetsTable = new Object;
    targetsTable.targets = [];
    targetsTable.volumes = [];


    for( var i = 0; i < state.volumes.length; i++  ){
	for(var j = 0; j < state.volumes[i].targets.length; j++){
	    var sort = state.volumes[i].targets[j];
	    targetsTable.targets.push(new Target(sort.host_guid,sort.nic_guid,sort.block_device,sort.statistics,
		    sort.port,sort.core_index,sort.active));
	    targetsTable.volumes.push(state.volumes[i].name);
	}
    }

    var str = JSON.stringify(targetsTable);
    fs.writeFile('public/assets/data/TargetsTable.json',str, function (err) {
	if (err) throw err;
	console.log('Targets Table saved!');
    });
}
