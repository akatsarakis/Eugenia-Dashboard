function setPerformance(){	

     	if(window.performance.write == undefined){return;}
	document.getElementById("ApplicationPerformance").innerHTML = "<tr><th>Read</th><td>"+window.performance.read.IOPS+
	    	      "</td><td>" + window.performance.read.throughput + "</td>" +
	              "<td>" + window.performance.read.average_request_size + "</td><td>"+window.performance.read.avg_response_time +
		      "</td></tr>"+"<tr><th>Write</th><td>"+window.performance.write.IOPS+
	    	      "</td><td>" + window.performance.write.throughput + "</td>" +
	              "<td>" + window.performance.write.average_request_size + "</td><td>"+window.performance.write.avg_response_time +
		      "</td></tr>"+"<tr class=\"total\"><th>Total</th>"+
		      "<td>"+Number(window.performance.read.IOPS+window.performance.write.IOPS)+
	    	      "</td><td>" + window.performance.read.throughput /*Number(window.performance.read.throughput+ window.performance.write.throughput) */+"</td> "+
	              "<td>" + window.performance.read.average_request_size /*Number(window.performance.read.average_request_size + window.performance.write.average_request_size)*/ +
		      "</td><td>"+Number(window.performance.read.avg_response_time + window.performance.write.avg_response_time) +"</td></tr>";
 
};
setInterval( setPerformance, 1000 );
