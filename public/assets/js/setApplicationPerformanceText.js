function setCapacity(){	

    if(window.capacity == undefined){return;}
    document.getElementById('ApplicationPerformanceText').innerHTML='';

    document.getElementById('ApplicationPerformanceText').innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
								    '&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
    								    '&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
								    '&nbsp;&nbsp;&nbsp;&nbsp;Migration: '+throughputUnit(window.applicationPerformance.migration) +"  "+
						                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
								    'Reconstruction: '+throughputUnit(window.applicationPerformance.reconstruction)  ;

}


setInterval( setCapacity, 1000 );

