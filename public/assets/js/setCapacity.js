function setCapacity(){	

    if(window.capacity == undefined){return;}
    document.getElementById('capacityTab').innerHTML='';
    var table = document.createElement('table');


    var tr = document.createElement('tr');   
    var tr2 = document.createElement('tr');
    var tr3 = document.createElement('tr');
    var tr4 = document.createElement('tr');

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');

    var text1 = document.createTextNode('Provisioned: '+capacityUnit(window.capacity.provisioned) + "*");
    var text2 = document.createTextNode('Physical: '+capacityUnit(window.capacity.physical));
    var text3 = document.createTextNode('Used: '+capacityUnit(window.capacity.used) + "*");
    var text4 = document.createTextNode('Free: '+freeSpace(window.capacity.free));

    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);
    td4.appendChild(text4);

    tr.appendChild(td1);
    tr2.appendChild(td2);
    tr3.appendChild(td3);
    tr4.appendChild(td4);
	
    table.appendChild(tr);
    table.appendChild(tr2);
    table.appendChild(tr3);
    table.appendChild(tr4);

    document.getElementById('capacityTab').appendChild(table);
    

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
