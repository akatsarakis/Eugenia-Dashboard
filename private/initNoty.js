var fs = require('fs'),
    path = require("path"),
    State = require('./objects.js').State, 
    Volume = require('./objects.js').Volume,
    Target = require('./objects.js').Target,
    Node = require('./objects.js').Node,
    Block_device = require('./objects.js').Block_device,
    Noty = require('./objects.js').Noty,
    Nic = require('./objects.js').Nic;

module.exports = initNoty;
var noty = [];

function initNoty( state, preState ){
    if(preState == 0){return;}
    fs.readFile(path.join(__dirname, '..', 'public/assets/data/Noty.json'),
	    				     'utf8', function (err, data) {
	if (err) {
	    console.log('Error: ' + err);
	    noty = [];
	}else{
	    noty = JSON.parse(data);
	}

	//check for changes
	addProperties( preState );
	updateChanges(state ,preState);

    });
}

function updateChanges(state, preState){
    if(state == undefined || preState == 0) {return;}
    checkVolumes(state, preState, 1);
    checkVolumes(preState, state, 0);
    var str = JSON.stringify(noty);
    fs.writeFile('public/assets/data/Noty.json',str, function (err) {
	if (err) throw err;
	console.log('Noty saved!');
    });

};


function checkVolumes( state1, state2, latest ){
    for(var i = 0; i < state1.volumes.length; i++){
	var volIndex = state2.containsVolume( state1.volumes[i] );
	var text = "JOINED EUGENIA";
	if(volIndex < 0){ //state2 doesn't contains that volume
	    if(latest != 1){ text = "REMOVED FROM EUGENIA";}
	    noty.push(new Noty("Volume",state1.volumes[i].name,"",text,getTime()));
	    return ;
	}else if(latest == 1){
	    if( state2.volumes[volIndex].active != state1.volumes[i].active ){
		noty.push(new Noty("Volume",state1.volumes[i].name,"",
			           state1.volumes[i].active,getTime()));
	    }
	}
	checkTargets(state1.volumes[i], state2.volumes[volIndex], latest);
	
    }
};

function checkTargets(vol1 , vol2, check){
    for(var i = 0; i < vol1.targets.length; i++){
	var targIndex = vol2.containsTarget( vol1.targets[i] );
	var text = "JOINED EUGENIA";
	if(targIndex < 0 ){
	    if(check !=1){ text = "REMOVED FROM EUGENIA";}
	    noty.push(new Noty("Target",vol1.targets[i].block_device,
			       "Volume: "+vol1.name,text,getTime()));
	    
	}else if( check == 1 ){ 
	    checkActive(vol1.targets[i], vol2.targets[targIndex], vol1.name);
	}
    }
};

function checkActive(targ1, targ2 ,volName){
    if(targ1.active != targ2.active){
	noty.push(new Noty("Target",targ1.block_device,"Volume: "+
		            volName,targ1.active,getTime()));

    }
};




//add properties to preState()
function addProperties( preState ){
    preState.containsVolume = function(volume) { 
	for(var i = 0; i<preState.volumes.length; i++){
	    if(preState.volumes[i].name == volume.name){
		return i;
	    }
	}
	return -1; 
    };

    preState.containsNode = function(node) { 
	for(var i = 0; i<preState.nodes.length; i++){
	    if(preState.nodes[i].host_guid == node.host_guid){
		return i;
	    }
	}
	return -1; 
    };


    for(var j = 0; j<preState.volumes.length; j++){
	var sort1 = preState.volumes[j];
	sort1.containsTarget = function(target) { 
	    for(var i = 0; i<this.targets.length; i++){
		if((this.targets[i].host_guid == target.host_guid) &&
		  (this.targets[i].block_device == target.block_device)){
		    return i;
		}
	    }
	    return -1; 
	};
    }



    for(var j = 0; j<preState.nodes.length; j++){
	var sort = preState.nodes[j];
	sort.containsNic = function(nic) { 
	    for(var i = 0; i<this.nics.length; i++){
		if(this.nics[i].nic_guid == nic.nic_guid){
		    return i;
		}
	    }
	    return -1; 
	};

	sort.containsBlockDevice = function(blockDevice) { 
	    for(var i = 0; i<sort.block_devices.length; i++){
		if(sort.block_devices[i].name == blockDevice.name){
		    return i;
		}
	    }
	    return -1; 
	};
    }

};

function getTime(){
    var currentdate = new Date();
    var pad = function(x) {
	return x < 10 ? '0'+x : x;
    };

    return pad( currentdate.getHours() ) + ":"+ 
	pad( currentdate.getMinutes() ) + ":" +
	pad( currentdate.getSeconds() );
};
