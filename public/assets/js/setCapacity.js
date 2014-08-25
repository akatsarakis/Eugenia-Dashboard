function setCapacity(){	

    if(window.capacity == undefined){return;}
    document.getElementById('capacityTab').innerHTML='';

    document.getElementById('capacityTab').innerHTML='&nbsp;&nbsp;&nbsp;Physical: '+capacityUnit(window.capacity.physical) +"  "+
						     '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Provisioned: '+capacityUnit(window.capacity.provisioned) + 
						     '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metadata: ' +capacityUnit(window.capacity.metadata)  ;

}


setInterval( setCapacity, 1000 );

// transform mb to gb
function mb2Tb(mb_size){
    return mb_size * 9.53674316 * Math.pow(10, -7);
}
//transform mb to tb
function mb2Gb(mb_size){
    return mb_size * 9.765625  * Math.pow(10, -4);
}

function capacityUnit(mb_size){

    if(mb_size < 1000){
	return mb_size.toFixed(2) + " MB";
    }else if(mb_size < 999999 ){
	return mb2Gb(mb_size).toFixed(2) +" GB";
    }else{
	return mb2Tb(mb_size).toFixed(2) +" TB";
    }
}

function freeSpace(mb_size){
    if(mb_size > 0){
	return capacityUnit(mb_size);
    }else{
	return capacityUnit(0);
    }
}
