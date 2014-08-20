var fs = require('fs');
module.exports = initPerformance;

function initPerformance( state ){
    var performance = new Object;
    performance.read = new Object;
    performance.write = new Object;
    performance.reconstruction = 0; 	// <<UNINITIALIZED>>
    performance.migration = 0; // <<UNINITIALIZED>>

    performance.read.throughput = '3.5 GB/s';   // <<UNINITIALIZED>>
    performance.read.IOPS = 923.773;  // <<UNINITIALIZED>>
    performance.read.average_response_time = 0; // <<UNINITIALIZED>>
    performance.read.average_request_size = '4.0 KB'; // <<UNINITIALIZED>>
    performance.read.avg_response_time = 0; 	// <<UNINITIALIZED>>


    performance.write.throughput = '0.0 B/s';  // <<UNINITIALIZED>>
    performance.write.IOPS = 0;  // <<UNINITIALIZED>>
    performance.write.average_response_time = 0; // <<UNINITIALIZED>>
    performance.write.average_request_size = 0; // <<UNINITIALIZED>>
    performance.write.avg_response_time = 0; 	// <<UNINITIALIZED>>

    
    var str = JSON.stringify(performance);
    fs.writeFile('public/assets/data/Performance.json',str, function (err) {
	if (err) throw err;
	console.log('Performance saved!');
    });
}

