//exporting object's 
exports.Volume = Volume;
exports.Target = Target;
exports.Node = Node;
exports.Block_device = Block_device;
exports.Nic = Nic;
exports.State = State;
exports.Noty = Noty;
exports.Policy = Policy;
exports.Statistics = Statistics;

//eugenia's volume object
function Volume(name,volume_guid,capacity,replicas,policy_id,active,core_id,max_target_core_index)
{
    this.name = name;
    this.targets = [];
    this.volume_guid = volume_guid;
    this.capacity = capacity;
    this.replicas = replicas;
    this.policy_id = policy_id;
    this.active = active;
    this.core_id = core_id;
    this.max_target_core_index = max_target_core_index;
    //central log level maybe

    this.addTarget = function(target){ this.targets.push(target); this.noTargets++; };
    this.noTargets = 0;

    this.containsTarget = function(target) { 
	for(var i = 0; i<this.targets.length; i++){
	    if(this.targets[i].host_guid == target.host_guid &&
		    this.targets[i].block_device == target.block_device){
			return i;
		    }
	}
	return -1; 
    };
};

//eugenia's Target object
function Target(host_guid,nic_guid,block_device,statistics,port,core_index,active)
{
    //static this.noTargets = (noTargets == undefined) ? 0 : (noTargets+1);
    this.host_guid = host_guid;
    this.nic_guid = nic_guid;
    this.block_device = block_device;
    this.statistics = statistics;
    this.port = port;
    this.core_index = core_index;
    this.active = active;
};

// eugenia's node object
function Node(domain_guid,host_guid,operating_system,version,release,active,memory,cpus)
{
    //static this.noNodes = (noNodes == undefined) ? 0 : (noNodes+1);
    this.domain_guid = domain_guid;
    this.host_guid = host_guid;
    this.os = new Object;
    this.os.operating_System = operating_system;
    this.os.version = version;
    this.os.release = release;
    this.active = active;
    this.memory = memory;
    this.cpus = cpus;
    this.block_devices = [];
    this.nics = [];
    this.addNic = function(nic){ this.nics.push(nic); };
    this.addBlockDevice = function(blockDevice){ this.block_devices.push(blockDevice); };

    this.containsNic = function(nic) { 
	for(var i = 0; i<this.nics.length; i++){
	    if(this.nics[i].nic_guid == nic.nic_guid){
		return i;
	    }
	}
	return -1; 
    };

    this.containsBlockDevice = function(blockDevice) { 
	for(var i = 0; i<this.block_devices.length; i++){
	    if(this.block_devices[i].name == blockDevice.name){
		return i;
	    }
	}
	return -1; 
    };


};

// eugenia's block_device object
function Block_device(name,capacity,latency,iops_r,active,media)
{
    //static this.noBlockDevices = (noBlockDevices == undefined) ? 0 : (noBlockDevices+1);
    this.name = name;
    this.capacity = capacity;
    this.latency = latency;
    this.iops_r = iops_r;
    this.active = active;
    this.media = media;
};

// eugenia's Nic object
function Nic(nic_guid,bandwidth,active)
{
    this.nic_guid = nic_guid;
    this.bandwidth = bandwidth; //in MB
    this.active = active;
};

// this object contains the whole eugenia satus and it's stats
function State(last_system_start)
{
    this.last_system_start = last_system_start;
    this.volumes = [];
    this.addVolume = function(vol){ this.volumes.push(vol); };
    this.nodes = [];
    this.addNode = function(node){ this.nodes.push(node); };
    this.activeNodes = 0; 
    this.activeVolumes = 0;
    this.activeTargets = 0; 
    this.capacity = 0; //in MB
    this.provisioned = 0; //in MB
    this.policies = [];
    this.addPolicy = function(policy){ this.policies.push(policy); };

    this.containsNode = function(node) { 
	for(var i = 0; i<this.nodes.length; i++){
	    if(this.nodes[i].host_guid == node.host_guid){
		return i;
	    }
	}
	return -1; 
    };

    this.containsVolume = function(volume) { 
	for(var i = 0; i<this.volumes.length; i++){
	    if(this.volumes[i].name == volume.name){
		return i;
	    }
	}
	return -1; 
    };

};

//Eugenia's Policy object
function Policy(id,thinly_provisioned,sla_latency,sla_max_divergence,min_free_space,sla_bandwidth,sla_iops)
{
    this.id = id;
    this.thinly_provisioned = thinly_provisioned;
    this.sla_latency = sla_latency;
    this.sla_max_divergence = sla_max_divergence;
    this.min_free_space = min_free_space;
    this.sla_bandwidth = sla_bandwidth;
    this.sla_iops = sla_iops;
 
}

//Notification Object
function Noty(device, name, message, active, time_stamp)
{
    this.device = device;
    this.name = name;
    this.message = message;
    this.active = active;
    this.time_stamp = time_stamp;
};

//Statistics it's a a child-object of a Target
function Statistics(eug_total_hits, eug_total_requests, eug_total_blocks, eug_total_req_misses, eug_target_used,
		    eug_total_req_writes, eug_total_req_reads, eug_blocks_writes, eug_blocks_reads, eug_iops,
		    eug_throughput, ds_reads, ds_reads_diff, ds_reads_merged, ds_sectors_read, ds_time_read,
		    ds_writes, ds_writes_diff, ds_writes_merged, ds_sectors_written, ds_time_write,
		    ds_inflight_ios, ds_time_ios)
{
	this.eug_total_hits = eug_total_hits;
	this.eug_total_requests = eug_total_requests;
	this.eug_total_blocks = eug_total_blocks;
	this.eug_total_req_misses = eug_total_req_misses;
	this.eug_target_used = eug_target_used;
	this.eug_total_req_writes = eug_total_req_writes;
	this.eug_total_req_reads = eug_total_req_reads;
	this.eug_blocks_writes = eug_blocks_writes;
	this.eug_blocks_reads = eug_blocks_reads;
	this.eug_iops = eug_iops;
	this.eug_throughput = eug_throughput;
	this.ds_reads = ds_reads;
	this.ds_reads_diff = ds_reads_diff;
	this.ds_reads_merged = ds_reads_merged;
	this.ds_sectors_read = ds_sectors_read;
	this.ds_time_read = ds_time_read;
	this.ds_writes = ds_writes;
	this.ds_writes_diff = ds_writes_diff;
	this.ds_writes_merged = ds_writes_merged;
	this.ds_sectors_written = ds_sectors_written;
	this.ds_time_write = ds_time_write;
	this.ds_inflight_ios = ds_inflight_ios;
	this.ds_time_ios = ds_time_ios;
};
