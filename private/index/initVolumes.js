var fs = require('fs');
module.exports = initVolumes;

function initVolumes( state ){
    var volumes = new Object;
    volumes.online = new Object;
    volumes.offline = new Object;
    volumes.online.degraded = 0;
    volumes.online.healthy = 0;
    volumes.offline.healthy = 0;
    volumes.offline.degraded = 0;
    volumes.volumes = state.volumes.length; 
    //volumes.
    for(var i = 0; i<state.volumes.length; i++){
	if(state.volumes[i].active == "ONLINE_HEALTHY"){
	    volumes.online.healthy++;
	}else if(state.volumes[i].active == "ONLINE_DEGRADED"){
	    volumes.online.degraded++;
	}else if(state.volumes[i].active == "OFFLINE_HEALTHY"){
	    volumes.offline.healthy++;
	}else if(state.volumes[i].active == "OFFLINE_DEGRADED"){
	    volumes.offline.degraded++;
	}else if(state.volumes[i].active == "OFFLINE_AUTO_SHUT"){
	    volumes.offline.healthy++;
	}
    }

    var str = JSON.stringify(volumes);
    fs.writeFile('public/assets/data/Volumes.json',str, function (err) {
	if (err) throw err;
	console.log('Volumes saved!');
    });
};

