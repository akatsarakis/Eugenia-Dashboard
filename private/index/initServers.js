var fs = require('fs');
module.exports = initServers;

//Servers == Nodes

function initServers( state ){

    var servers = new Object;
    servers.servers = state.nodes.length;
    servers.assigned = 2;
    servers.CPU_util = 0; 	// se tis %  // <<UNINITIALIZED>>
    servers.memory_util = 0; 	// se tis % // <<UNINITIALIZED>>

    var str = JSON.stringify(servers);
    fs.writeFile('public/assets/data/Servers.json',str, function (err) {
	if (err) throw err;
	console.log('Servers saved!');
    });

};
