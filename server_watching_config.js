//Libraries
var http = require("http");
var fs = require("fs");
var mime = require('mime');
var $ = require('jquery');
var LoadData = require('./private/data.js');


//parsing for port and host
console.log("starting");
var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;

//create the server
var server = http.createServer(function(request, response){
    console.log("recieved a request: "+ request.url);

    fs.readFile("./public/" + request.url, function(error,data){
	if(error){
	    response.writeHead(404, {"Content-type":"text/plain"});
	    response.end("Sorry the Page was not found!");
	    console.log("request of : "+ request.url+ " FAILED!");
	}else{
	    response.writeHead(200, {"Content-type":mime.lookup(request.url)});
	    response.end(data);
	}
    });
});
server.listen(port, host, function(){
    //delete the Noty file first
    if(fs.existsSync('./public/assets/data/Noty.json')){
    	fs.unlinkSync('./public/assets/data/Noty.json'); 
    }
    console.log("Listening to " + host +":"+ port);
});

//if post/host change restart the server
fs.watchFile("config.json", function(){
    var config = JSON.parse(fs.readFileSync("config.json"));
    host = config.host;
    port = config.port;
    server.close();
    server.listen(port, host, function(){
	console.log("Now listening to :" + host + ":" + port);
    });
});

setInterval(LoadData, 1300);
