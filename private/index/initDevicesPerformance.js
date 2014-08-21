var fs = require('fs');
module.exports = initDevicesPerformance;

function initDevicesPerformance( state ){
    var devicesPerformance = new Object;
    devicesPerformance.read = new Object;
    devicesPerformance.write = new Object;
    devicesPerformance.reconstruction = 0; 	// <<UNINITIALIZED>>
    devicesPerformance.migration = 0; // <<UNINITIALIZED>>

    devicesPerformance.read.throughput = '4.5 GB/s';   // <<UNINITIALIZED>>
    devicesPerformance.read.IOPS = 923.773;  // <<UNINITIALIZED>>
    devicesPerformance.read.average_response_time = 0; // <<UNINITIALIZED>>
    devicesPerformance.read.average_request_size = '8.0 KB'; // <<UNINITIALIZED>>
    devicesPerformance.read.avg_response_time = 0; 	// <<UNINITIALIZED>>


    devicesPerformance.write.throughput = '0.0 B/s';  // <<UNINITIALIZED>>
    devicesPerformance.write.IOPS = 0;  // <<UNINITIALIZED>>
    devicesPerformance.write.average_response_time = 0; // <<UNINITIALIZED>>
    devicesPerformance.write.average_request_size = 0; // <<UNINITIALIZED>>
    devicesPerformance.write.avg_response_time = 0; 	// <<UNINITIALIZED>>

    
    var str = JSON.stringify(devicesPerformance);
    fs.writeFile('public/assets/data/DevicesPerformance.json',str, function (err) {
	if (err) throw err;
	console.log('DevicesPerformance saved!');
    });
}

