function setPerformance(){	

     	if(window.performance.write == undefined){return;}
	document.getElementById("Performance").innerHTML = "<tr><th>Read</th><td>"+window.performance.read.IOPS+
	    	      "</td><td>" + window.performance.read.throughput + "</td>" +
	              "<td>" + window.performance.read.average_request_size + "</td><td>"+window.performance.read.migration +"</td>"+
		      "<td>" + window.performance.read.reconstruction +"</td></tr>"+"<tr><th>Write</th><td>"+window.performance.write.IOPS+
	    	      "</td><td>" + window.performance.write.throughput + "</td>" +
	              "<td>" + window.performance.write.average_request_size + "</td><td>"+window.performance.write.migration +"</td>"+
		      "<td>" + window.performance.write.reconstruction +"</td></tr>"+"<tr class=\"total\"><th>Total</th>"+
		      "<td>"+Number(window.performance.read.IOPS+window.performance.write.IOPS)+
	    	      "</td><td>" + window.performance.read.throughput /*Number(window.performance.read.throughput+ window.performance.write.throughput) */+"</td> "+
	              "<td>" + window.performance.read.average_request_size /*Number(window.performance.read.average_request_size + window.performance.write.average_request_size)*/ +
		      "</td><td>"+Number(window.performance.read.migration + window.performance.write.migration) +"</td>"+
		      "<td>" + Number(window.performance.read.reconstruction + window.performance.write.reconstruction) +"</td></tr>";
 

};


setInterval( setPerformance, 1000 );
