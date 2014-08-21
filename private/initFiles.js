
var fs = require('fs'),
    initNoty = require('./initNoty.js');
    //
    initCapacity = require('./index/initCapacity.js');
    initApplicationPerformance = require('./index/initApplicationPerformance.js');
    initDevicesPerformance = require('./index/initDevicesPerformance.js');
    initServers = require('./index/initServers.js');
    initDevices = require('./index/initDevices.js');
    initVolumes = require('./index/initVolumes.js');
    initPolicies = require('./index/initPolicies.js');
    initTargetsTable = require('./tables/initTargetsTable.js');
    initVolumesTable = require('./tables/initVolumesTable.js');
    //
    State = require('./objects.js').State, 
    Volume = require('./objects.js').Volume,
    Target = require('./objects.js').Target,
    Node = require('./objects.js').Node,
    Block_device = require('./objects.js').Block_device,
    Nic = require('./objects.js').Nic;
    

module.exports = initFiles;

//call all the functions needed to initialize the
//../public/data folder with the .json files
function initFiles( state , preState ){
    initTargetsTable( state );
    initNoty( state , preState );
    initCapacity( state);
    initApplicationPerformance(state,preState);
    initDevicesPerformance(state,preState);
    initServers(state);
    initDevices(state);
    initVolumes(state);
    initPolicies(state);
    initVolumesTable(state);
}

