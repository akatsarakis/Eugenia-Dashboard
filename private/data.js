var state;
var preState;

var fs = require('fs'),
    xml2json = require('xml-to-json'),
    State = require('./objects.js').State, 
    Volume = require('./objects.js').Volume,
    Target = require('./objects.js').Target,
    Node = require('./objects.js').Node,
    Block_device = require('./objects.js').Block_device,
    Nic = require('./objects.js').Nic,
    initFiles = require('./initFiles.js'),
    Policy = require('./objects.js').Policy,
    Statistics = require('./objects.js').Statistics;
path = require("path");

module.exports = LoadData;

//parsing the xml to json and call readData
function LoadData(){

    xml2json({
	input: './xml/eugenia_conf.xml',
	output: null
    }, function(err, result) {

	if(err) {
	    console.error(err);
	} else {
	    readData(result);
	    console.log("READING   DATA");
	}

    });
}

//initialize the objects "state" and "Prestate" (previous state) of
//eugenia and write them on ../public/assets/data/state.json
//../public/assets/data/preState.json
function readData(data){
    var node;

    var device;
    var nic;
    var volume;
    var last_system_start = data.EUGENIA_CONFIGURATION_FILE.LAST_SYSTEM_START;
    var policies = data.EUGENIA_CONFIGURATION_FILE.POLICIES.POLICY;
    var nodes = data.EUGENIA_CONFIGURATION_FILE.NODES;
    var volumes = data.EUGENIA_CONFIGURATION_FILE.VOLUMES;
    //init preState with the previous state
    fs.readFile(path.join(__dirname, '..', 'public/assets/data/state.json'), 'utf8', function (err, data) {
	if (err) {
	    console.log('Error: ' + err);
	    preState = 0;
	}else{
	    preState = JSON.parse(data);
	}
	var str = JSON.stringify(preState);
	fs.writeFile('public/assets/data/preState.json',str, function (err) {
	    if (err) throw err;
	    console.log('PreState  saved!');
	});


	state = new State(last_system_start);
	if(policies.length == undefined){
	    if(policies.POLICY_ID['_'] != "NONE" ){ 
		policy =policy = creatPolicy(policies);
		state.addPolicy(policy);
	    }
	}else{
	    for(var i = 0; i<policies.length; i++){
		if(policies[i].POLICY_ID['_'] != "NONE" ){ 
		    policy = creatPolicy(policies[i]);
		    state.addPolicy(policy);
		}
	    }
	}

	for(var i = 0; i<nodes.NODE.length; i++) {
	    node = createNode(nodes.NODE[i]);
	    state.addNode(node);
	    if(node.active) { state.activeNodes++; }

	    //adding block devices
	    //to each node +
	    //updating capacity
	    //and provisioned
	    for(var j = 0; j<nodes.NODE[i].BLOCK_DEVICES.BLOCK_DEVICE.length; j++){
		var sort = nodes.NODE[i].BLOCK_DEVICES.BLOCK_DEVICE[j];
		device = new Block_device(sort.BD_NAME['_'],
			sort.CAPACITY['_'],sort.LATENCY['_'],
			sort.IOPS_r['_'],sort.active['_']);
		node.addBlockDevice(device);

		if(device.active != 0){
		    state.capacity += Number(sort.CAPACITY['_']);
		}
	    }
	    for(var j = 0; j<nodes.NODE[i].NICS.NIC.length; j++){
		var sort = nodes.NODE[i].NICS.NIC[j];
		nic = new Nic(sort.NIC_GUID,sort.bandwidth['_'],
			sort.active['_']);
		node.addNic(nic);
	    }
	}
	if(volumes.VOLUME.length == undefined){
	    volume = createVolume(volumes.VOLUME);
	    state.addVolume(volume);
	    if(volume.active == "ONLINE_HEALTHY") {
		state.activeVolumes++;
	    }
	    var sort = volumes.VOLUME;
	    if(sort.TARGETS!= undefined){
		if(sort.TARGETS.TARGET.length == undefined){
		    var statistics = createStatistics(sort.TARGETS.TARGET.STATISTICS);
		    target = createTarget(sort.TARGETS.TARGET,statistics);
		    if(target.active == "TARGET_ONLINE") {
			state.activeTargets++;
		    }
		    volume.addTarget(target);
		    state.provisioned += Number(sort.TARGETS.TARGET.BLOCK_DEVICE.PROVISION['_']);

		}else{
		    for(var j = 0; j<sort.TARGETS.TARGET.length; j++){
			var statistics = createStatistics(sort.TARGETS.TARGET[j].STATISTICS);
			target = createTarget(sort.TARGETS.TARGET[j],statistics);
			if(target.active == "TARGET_ONLINE") {
			    state.activeTargets++;
			}
			volume.addTarget(target);
			state.provisioned += Number(sort.TARGETS.TARGET[j].BLOCK_DEVICE.PROVISION['_']);
		    }
		}

	    }

	}else{
	    for(var i = 0; i < volumes.VOLUME.length; i++){
		var sort = volumes.VOLUME[i];
		volume = createVolume(volumes.VOLUME[i]);

		state.addVolume(volume);
		if(volume.active == "ONLINE_HEALTHY") {
		    state.activeVolumes++;
		}
		if(sort.TARGETS.TARGET!= undefined){
		    if(sort.TARGETS.TARGET.length == undefined){
			var statistics = createStatistics(sort.TARGETS.TARGET.STATISTICS);
			target = createTarget(sort.TARGETS.TARGET,statistics);
			if(target.active == "TARGET_ONLINE") {
			    state.activeTargets++;
			}
			volume.addTarget(target);
			state.provisioned += Number(sort.TARGETS.TARGET.BLOCK_DEVICE.PROVISION['_']);

		    }else{

			for(var j = 0; j<sort.TARGETS.TARGET.length; j++){
			    var statistics = createStatistics(sort.TARGETS.TARGET[j].STATISTICS);
			    target = createTarget(sort.TARGETS.TARGET[j],statistics);
			    if(target.active == "TARGET_ONLINE") {
				state.activeTargets++;
			    }
			    volume.addTarget(target);
			    state.provisioned += Number(sort.TARGETS.TARGET[j].BLOCK_DEVICE.PROVISION['_']);
			}
		    }
		}
	    }

	}
	var str = JSON.stringify(state);
	fs.writeFile('public/assets/data/state.json',str, function (err) {
	    if (err) throw err;
	    initFiles(state , preState);
	    console.log('State saved!');
	});


    });
}

//creates and returns a Statistics onject
function createStatistics(target){
    var statistics = new Statistics(target.EUG_TOTAL_HITS, target.EUG_TOTAL_REQUESTS, target.EUG_TOTAL_BLOCKS,
	    target.EUG_TOTAL_REQ_MISSES, target.EUG_TARGET_USED, target.EUG_TOTAL_REQ_WRITES,
	    target.EUG_TOTAL_REQ_READS, target.EUG_BLOCKS_WRITES, target.EUG_BLOCKS_READS, 
	    target.EUG_IOPS, target.EUG_THROUGHPUT, target.DS_READS, target.DS_READS_DIFF,
	    target.DS_READS_MERGED,target.DS_SECTORS_READ, target.DS_TIME_READ,
	    target.DS_WRITES, target.DS_WRITES_DIFF ,target.DS_WRITES_MERGED, 
	    target.DS_SECTORS_WRITTEN, target.DS_TIME_WRITE,target.DS_INFLIGHT_IOS,
	    target.DS_TIME_IOS);
    return statistics;
};

//creates and returns a Target object
function createTarget(target,statistics){
    var newTarget = new Target(target.HOST_GUID,
	    target.NIC_GUID,
	    target.BLOCK_DEVICE.BD_NAME,
	    statistics,
	    target.PORT['_'],
	    target.CORE_INDEX['_'],
	    target.ACTIVE['_']);
    return newTarget;
};

//creates and returns a Node object
function createNode(node){
    var newNode = new Node(node.DOMAIN_GUID,node.HOST_GUID['_'],
	    node.OS.Operating_System['_'],
	    node.OS.Version['_'],
	    node.OS.Release['_'],
	    node.active['_'],
	    node.MEMORY['_'],
	    node.CPUS['_']);
    return newNode;

};

//creates and returns a Volume object
function createVolume(volume){
    var newVolume = new Volume(volume.NAME['_'],
	    volume.VOLUME_GUID['_'],
	    volume.CAPACITY['_'],
	    volume.REPLICAS['_'],
	    volume.POLICY_ID,
	    volume.ACTIVE['_'],
	    volume.CORE_ID['_'],
	    volume.MAX_TARGET_CORE_INDEX['_']);
    return newVolume;
};

//creates and returns a Policy object
function creatPolicy(policy){
    var newPolicy = new Policy(policy.POLICY_ID['_'],policy.THINLY_PROVISIONED['_'],
			    policy.SLA_LATENCY['_'],policy.SLA_LATENCY_MAX_DIVERGENCE['_'],
			    policy.MIN_TARGET_FREE_SPACE_PERCENTAGE,
			    policy.SLA_BANDWIDTH,policy.SLA_IOPS);

    return newPolicy;
};
