#Eugenia Dashboard   
————————————————————————————————————————————————————

Welcome to the Eugenia Dashboard 2.0.1 release! 


Usefull Info
------------

	1.The folder private contains only files for the purposes of the 
	  server on the other hand public is the only accesible folder for
	  the website

	2.If the server crashes for any reason you may have to go to
   	  ./public/assets/data and create a file with a name "Noty.json"

	3.This server runs by default on host: 127.0.0.1 and port 1340
	  you can manualy change them by modifing the file "config.json"

Requirements
------------

 	1) Nodejs (tested on v0.8.2)
    		Download the latest version of Nodejs on
    		http://nodejs.org/download/
 
 	2) modules of Nodejs 

		*i) install npm if you haven't already by running this command
			> curl http://npmjs.org/install.sh | sh
		*ii) mime 
			> npm install mime 
		*iii) xml2js
			> npm install xml2js
		*iv) jquery
			> npm install jquery
	
 	*(already include in folder node_modules only if you miss that folder
	  download manualy)

Run the server
---------------

	1. Open Terminal and go to the folder directory

	2. Run the command 
		> node server_watching_config.js 


Terminate the server
--------------------
	
	 Press "Control+C" on Terminal
