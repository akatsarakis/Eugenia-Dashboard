var serversCPUChart,serversMemoryChart;

$(function () {

    var gaugeOptions = {

        chart: {
            type: 'solidgauge',
    	    backgroundColor: null,
	    plotBackgroundColor: 'none',
    	    height:220,
            width: 170
	},

        title: null,

        /*pane: {
            center: ['50%', '50%'],
            size: '100%',
            startAngle: -180,
            endAngle: 0,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },*/

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },

	credits: {
            enabled: false
        }
    };

    // The speed gauge
    $('#ServersWidgetCPU').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
		enabled: false,
		x: 0,
		y:20 ,
                text: 'CPU'
            },
	    
        },
	pane: {
            center: ['50%', '50%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        series: [{
            name: 'CPU Utilazation',
            data: [80],
            dataLabels: {
		y: -10,
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'silver') + '">{y}%</span><br/>' +
                       '<span style="font-size:12px;color:silver">CPU Utilazation</span></div>'
            },
            tooltip: {
                valueSuffix: ' %'
            }
        }]

    }));

    // The servers widget Memory utilazation gauge
    $('#ServersWidgetMemory').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
		enabled: false,
		x: 0,
		y:20 ,
                text: 'Memory'
            }
	},
	pane: {
            center: ['50%', '50%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        series: [{
            name: 'Memory',
            data: [30],
            dataLabels: {
                y: -10,
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'silver') + '">{y}%</span><br/>' +
                       '<span style="font-size:12px;color:silver">Memory Utilazation</span></div>'
            },
            tooltip: {
                valueSuffix: ' %'
            }
        }]

    }));

    // Bring life to the dials
    setInterval(function () {
        // CPU widget
        var chart = $('#ServersWidgetCPU').highcharts(),
            point,
            newVal,
            inc;

        if (chart) {
            point = chart.series[0].points[0];
            inc = Math.round((Math.random() - 0.5) * 100);
            newVal = point.y + inc;

            if (newVal < 0 || newVal > 100) {
                newVal = point.y - inc;
            }

            point.update(newVal);
        }

        // Memory widget
        chart = $('#ServersWidgetMemory').highcharts();
        if (chart) {
            point = chart.series[0].points[0];
            inc = Math.round((Math.random() - 0.5) * 100);
            newVal = point.y + inc;

            if (newVal < 0 || newVal > 100) {
                newVal = point.y - inc;
            }

            point.update(newVal);
        }
    }, 2000);


});
