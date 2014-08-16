var fs = require('fs');
module.exports = initVolumes;

function initVolumes( state ){
    var volumes = new Object;
    volumes.online = 0;
    volumes.offline = 0;
    volumes.degraded = 0;
    //volumes.
    for(var i = 0; i<state.volumes.length; i++){
	if(state.volumes[i].active == "ONLINE_HEALTHY"){
	    volumes.online++;
	}else if(state.volumes[i].active == "ONLINE_DEGRADED"){
	    volumes.online++;
	    volumes.degraded++;
	}else if(state.volumes[i].active == "OFFLINE_HEALTHY"){
	    volumes.offline++;
	}else if(state.volumes[i].active == "OFFLINE_DEGRADED"){
	    volumes.offline++;
	    volumes.degraded++;
	}else if(state.volumes[i].active == "OFFLINE_AUTO_SHUT"){
	    volumes.offline++;
	}
    }

    var str = JSON.stringify(volumes);
    fs.writeFile('public/assets/data/Volumes.json',str, function (err) {
	if (err) throw err;
	console.log('Volumes saved!');
    });
};

