var fs = require('fs');
module.exports = initApplicationPerformance;

function initApplicationPerformance( state,preState ){
    var applicationPerformance = new Object;
    applicationPerformance.read = new Object;
    applicationPerformance.write = new Object;

    applicationPerformance.reconstruction = 0; 	// <<UNINITIALIZED>>
    applicationPerformance.migration = 0; // <<UNINITIALIZED>>

    applicationPerformance.read.throughput = 0;   
    applicationPerformance.read.IOPS = 0;  
    applicationPerformance.read.average_request_size = 0; // <<UNINITIALIZED>>
    applicationPerformance.read.avg_response_time = 0; 	


    applicationPerformance.write.throughput = 0;  
    applicationPerformance.write.IOPS = 0;  
    applicationPerformance.write.average_request_size = 0; // <<UNINITIALIZED>>
    applicationPerformance.write.avg_response_time = 0; 


    for(var i = 0 ;i<state.volumes.length; i++){
	for(var j = 0; j<state.volumes[i].targets.length; j++){
	    var target = state.volumes[i].targets[j];
	    applicationPerformance.read.IOPS += Number(target.statistics.ds_reads_diff);
	    applicationPerformance.write.IOPS += Number(target.statistics.ds_writes_diff);
	    var volIndex = containsVolume(preState,state.volumes[i]);
	    if(volIndex != -1){
		var targIndex = containsTarget(preState.volumes[volIndex],target)
		    if(targIndex != -1){
			var preTarget = preState.volumes[volIndex].targets[targIndex];
			applicationPerformance.write.throughput += 
			    Number((target.statistics.ds_sectors_written - 
				    preTarget.statistics.ds_sectors_written)*512/2);
			applicationPerformance.read.throughput +=
			    Number((target.statistics.ds_sectors_read - 
				    preTarget.statistics.ds_sectors_read)*512/2);
			
		    }
	    }
	}
    }
    if(applicationPerformance.write.throughput < 0){ applicationPerformance.write.throughput = 0; }
    if(applicationPerformance.read.throughput < 0){ applicationPerformance.read.throughput = 0; }
    if(applicationPerformance.write.IOPS > 0){
        applicationPerformance.write.average_request_size = applicationPerformance.write.throughput / applicationPerformance.write.IOPS;
        applicationPerformance.write.avg_response_time = 1 / applicationPerformance.write.IOPS;
    }
    if(applicationPerformance.read.IOPS > 0){
        applicationPerformance.read.average_request_size = applicationPerformance.read.throughput / applicationPerformance.read.IOPS;
        applicationPerformance.read.avg_response_time = 1 / applicationPerformance.read.IOPS;
    }
    var str = JSON.stringify(applicationPerformance);
    fs.writeFile('public/assets/data/ApplicationPerformance.json',str, function (err) {
	if (err) throw err;
	console.log('ApplicationPerformance saved!');

    });
}

containsVolume = function(preState,volume) { 
    for(var i = 0; i<preState.volumes.length; i++){
	if(preState.volumes[i].name == volume.name){
	    return i;
	}
    }
    return -1; 
};

containsTarget = function(volume,target) { 
    for(var i = 0; i<volume.targets.length; i++){
	if(volume.targets[i].host_guid == target.host_guid &&
		volume.targets[i].block_device == target.block_device){
		    return i;
		}
    }
    return -1; 
};

