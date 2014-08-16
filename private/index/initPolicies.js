var fs = require('fs');
module.exports = initPolicies;

function initPolicies( state ){
    var policies = new Object;
    policies.defined = state.policies.length;
    policies.migration = 0; 	//se % // <<UNINITIALIZED>>
    var pol = [];
    for(var i = 0; i<state.policies.length; i++){
	pol[i] = state.policies[i].id;
    }
    for(var i = 0; i<state.volumes.length; i++){
	contains( state.volumes[i].policy_id , pol);
    }
    policies.used = policies.defined - pol.length ;
    
    var str = JSON.stringify(policies);
    fs.writeFile('public/assets/data/Policies.json',str, function (err) {
	if (err) throw err;
	console.log('Policies saved!');
    });
};

function contains( id, table){
    var index = table.indexOf(id);
    if (index > -1) {
	table.splice(index, 1);
    }
}
