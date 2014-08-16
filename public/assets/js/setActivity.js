/**
* Displays the last 4 activity changes to the list.
**/
function setNotyList(){

	var activities = window.notyObj;
	var list = document.getElementById('notyHistory').innerHTML = ' ' ;
	

	var ul = document.getElementById("notyHistory");
	
	
	var end=(activities.length-1);
	var counter =0 ;
	while(end >= 0 && counter < 4){	
		
		appendList(ul,activities[end].name
			,activities[end].active,activities[end].time_stamp
			,activities[end].device);
		end--;
		counter++;
	
	}
	var rows = ul.getElementsByTagName('li');
	for(var i = 0; i<rows.length; i++){
		$(rows[i]).click(function() {
	    		location.href = 'activity.html';
		});	
	}
   // setcolorFlags(ul);

}
/**
* Appends a new item to the activity list.
* Adds a right colored box on each item in the list depending on the type of activity:
* blue label for targets and purple for Volumes.
**/
function appendList(list ,name, active,time_stamp,device){

	var li = document.createElement("li");
	i = document.createElement("i");	
	i.className = device;
	
	//sets red triangle for error states.	 
	if( active == "ONLINE_DEGRADED" || active == "TARGET_OFFLINE_LOST" ) {
		i.className = i.className+" error";
	}
	li.appendChild(i);

	para = document.createElement("p");
	para.className = "sender";
	para.appendChild(document.createTextNode(device+": "+name));	
	li.appendChild(para);
	
	para2 = document.createElement("p");
	para2.className = "message";	
	para2.appendChild(document.createTextNode( time_stamp+" - "));

	strong = document.createElement("strong");
	strong.appendChild(document.createTextNode(active));
	

	para2.appendChild(strong);
	li.appendChild(para2);	
   
	list.appendChild(li);
    setLabels();
	
	

}
/**
* Displays at the end of the list an auxiliary,
* label that describes the colors for list items.
**/
function setLabels(){
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(10,10,10,10);
    ctx.fillStyle="white";
    ctx.font = "15px sans-serif";
    ctx.fillText("Target",25,20)

    ctx.fillStyle="purple";
    ctx.fillRect(75,10,10,10);
    ctx.fillStyle="white"
    ctx.fillText("Volume",88,20)
    
    ctx.fillStyle="#FF0000"; 
    ctx.moveTo(150,10);
    ctx.lineTo(158,10);
    ctx.lineTo(158,18);
    ctx.fill();
    ctx.fillStyle="white";
    ctx.fillText("Error",162,20);

}
//updates list every 3 seconds.
setInterval(setNotyList,3000);





