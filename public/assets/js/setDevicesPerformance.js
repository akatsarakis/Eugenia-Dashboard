function setDevicesPerformance(){	

     	if(window.devicesPerformance.write == undefined){return;}
	document.getElementById("DevicesPerformance").innerHTML = 
	    	      "<tr class=\"total\"><th>Total</th>"+
		      "<td>"+Number(window.devicesPerformance.read.IOPS+window.devicesPerformance.write.IOPS)+
	    	      "</td><td>" + window.devicesPerformance.read.throughput /*Number(window.devicesPerformance.read.throughput+ window.devicesPerformance.write.throughput) */+"</td> "+
	              "<td>" + Number(window.devicesPerformance.read.avg_response_time + window.devicesPerformance.write.avg_response_time)+
		      "</td><td>"+  window.devicesPerformance.read.average_request_size /*Number(window.devicesPerformance.read.average_request_size
		      + window.devicesPerformance.write.average_request_size)*/ +"</td></tr>"+
	    	      "<tr><th>Read</th><td>"+window.devicesPerformance.read.IOPS+
	    	      "</td><td>" + window.devicesPerformance.read.throughput + "</td>" +
	              "<td>" + window.devicesPerformance.read.avg_response_time  + "</td><td>"+window.devicesPerformance.read.average_request_size +
		      "</td></tr>"+"<tr><th>Write</th><td>"+window.devicesPerformance.write.IOPS+
	    	      "</td><td>" + window.devicesPerformance.write.throughput + "</td>" +
	              "<td>" + window.devicesPerformance.write.avg_response_time + "</td><td>"+ window.devicesPerformance.write.average_request_size +
		      "</td></tr>";
 
};
setInterval( setDevicesPerformance, 2000 );
