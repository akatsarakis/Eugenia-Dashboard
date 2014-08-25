function setDevicesPerformance(){	

     	if(window.devicesPerformance.write == undefined){return;}
	document.getElementById("DevicesPerformance").innerHTML = 
	    	      "<tr class=\"total\"><th>Total</th>"+
		      "<td>"+Number(window.devicesPerformance.read.IOPS+window.devicesPerformance.write.IOPS).toLocaleString()+
	    	      "</td><td>" + throughputUnit(Number(window.devicesPerformance.read.throughput+ window.devicesPerformance.write.throughput))+"</td> "+
	              "<td>" +responseTimeUnit( Number(window.devicesPerformance.read.avg_response_time + window.devicesPerformance.write.avg_response_time))+
		      "</td><td>"+  ioSizeUnit(Number(window.devicesPerformance.read.average_request_size)
		      + Number(window.devicesPerformance.write.average_request_size))+"</td></tr>"+
	    	      "<tr><th>Read</th><td>"+window.devicesPerformance.read.IOPS.toLocaleString()+
	    	      "</td><td>" + throughputUnit( window.devicesPerformance.read.throughput) + "</td>" +
	              "<td>" + responseTimeUnit(window.devicesPerformance.read.avg_response_time)  +
		      "</td><td>"+ioSizeUnit(Number(window.devicesPerformance.read.average_request_size)) +"</td></tr>"+
		      "<tr><th>Write</th><td>"+window.devicesPerformance.write.IOPS.toLocaleString()+
	    	      "</td><td>" + throughputUnit( window.devicesPerformance.write.throughput) + "</td>" +
	              "<td>" + responseTimeUnit(window.devicesPerformance.write.avg_response_time) + "</td><td>"+
		      ioSizeUnit(Number(window.devicesPerformance.write.average_request_size)) +"</td></tr>";
 
};
setInterval( setDevicesPerformance, 2000 );

