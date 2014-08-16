
var fs = require('fs'),
    initNoty = require('./initNoty.js');
    //
    initCapacity = require('./index/initCapacity.js');
    initPerformance = require('./index/initPerformance.js');
    initServers = require('./index/initServers.js');
    initDevices = require('./index/initDevices.js');
    initVolumes = require('./index/initVolumes.js');
    initPolicies = require('./index/initPolicies.js');
    initStatus = require('./index/initStatus.js');
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
    initPerformance(state);
    initServers(state);
    initDevices(state);
    initVolumes(state);
    initPolicies(state);
    initStatus(state);
    initVolumesTable(state);
}

