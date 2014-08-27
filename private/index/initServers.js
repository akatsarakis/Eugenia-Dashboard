var fs = require('fs');
module.exports = initServers;

//Servers == Nodes

function initServers( state ){

    var servers = new Object;
    servers.servers = state.nodes.length;
    servers.assigned = 2;
    servers.storage_servers = 0; //how many of them are for storage  // <<UNINITIALIZED>>
    servers.thin_servers = 0;    // how many of them are thin  // <<UNINITIALIZED>>
    servers.CPU_util = 0; 	// se tis %  // <<UNINITIALIZED>>
    servers.memory_util = 0; 	// se tis % // <<UNINITIALIZED>>

    var str = JSON.stringify(servers);
    fs.writeFile('public/assets/data/Servers.json',str, function (err) {
	if (err) throw err;
	console.log('Servers saved!');
    });

};
