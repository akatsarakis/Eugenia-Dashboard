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

function b2mb(b_size){
    return b_size * 0.000000954
};
// transform mb to gb
function mb2Tb(mb_size){
    return mb_size * 9.53674316 * Math.pow(10, -7);
};
//transform mb to tb
function mb2Gb(mb_size){
    return mb_size * 9.765625  * Math.pow(10, -4);
};

function throughputUnit(b_size){
    var mb_size = b2mb(b_size);
    if(b_size < 0){
	return "0 B/s";
    }else if(b_size < 1024){
	return b_size + " B/s"
    }else if(mb_size < 1){
	return (b_size * 0.00098).toFixed(1) +" KB/s";
    }else if(mb_size < 1000){
	return mb_size.toFixed(2) + " MB/s";
    }else if(mb_size < 999999 ){
	return mb2Gb(mb_size).toFixed(1) +" GB/s";
    }else{
	return mb2Tb(mb_size).toFixed(1) +" TB/s";
    }
};

function responseTimeUnit(seconds){
    var msecs = s2ms(seconds);
    if(msecs >1000){
    	return msecs.toFixed(0) +" ms";
    }else if(msecs > 10){
	return msecs.toFixed(1) +" ms";
    }else{
	return msecs.toFixed(3) +" ms";
    }
};
function s2ms(seconds){
    return seconds * 1000;
}

function ioSizeUnit(b_size){
	var mb_size = b2mb(b_size);
    if(b_size < 0){
	return "0 B";
    }else if(b_size < 1024){
	return b_size.toFixed(1) + " B";
    }else if(mb_size < 1){
	return (b_size * 0.00098).toFixed(1) +" KB";
    }else if(mb_size < 1000){
	return mb_size.toFixed(2) + " MB";
    }else if(mb_size < 999999 ){
	return mb2Gb(mb_size).toFixed(1) +" GB";
    }else{
	return mb2Tb(mb_size).toFixed(1) +" TB";
    }

};
