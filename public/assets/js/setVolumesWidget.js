$(function () {
    var options1 = {
	chart: {
	    renderTo:VolumesWidget,
type: 'column',
backgroundColor: null,
plotBackgroundColor: 'none',
height: 180,
width: 340
	},
credits: {
    enabled: false
},
title: {
    text: ''
},
xAxis: {
    categories: ['Total', 'Online', 'Offline']
},
yAxis: {
    min: 0,
    title: {
	text: 'Eugenia Volumes'
    },
    stackLabels: {
	enabled: true,
	style: {
	    fontWeight: 'bold',
	    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	}
    }
},
    legend: {
	align: 'right',
	x: 0,
	itemDistance: 5,
	verticalAlign: 'top',
	y: 0,
	floating: true,
	backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	borderColor: '#CCC',
	borderWidth: 1,
	shadow: false
    },
    tooltip: {
	formatter: function () {
	    return '<b>' + this.x + '</b><br/>' +
		this.series.name + ': ' + this.y + '<br/>' +
		'Total: ' + this.point.stackTotal;
	}
    },
    plotOptions: {
	column: {
	    stacking: 'normal',
	    dataLabels: {
		enabled: false,
		color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
		style: {
		    textShadow: '0 0 3px black, 0 0 3px black'
		}
	    }
	}
    },
    series: [{
	name: 'Healthy',
	data: [3, 3, 0]
    }, {
	name: 'Degraded',
	data: [3, 0, 3]
    }]
}

/**
 * Dark theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
Highcharts.createElement('link', {
    href: 'http://fonts.googleapis.com/css?family=Dosis:400,600',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

var theme1 = {
    colors: ["#90ee7e", "#f45b5b", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
    "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    chart: {
	style: {
	    fontFamily: "'Unica One', sans-serif"
	},
	plotBorderColor: '#606063'
    },
    title: {
	style: {
	    color: '#E0E0E3',
	    textTransform: 'uppercase',
	    fontSize: '20px'
	}
    },
    subtitle: {
	style: {
	    color: '#E0E0E3',
	    textTransform: 'uppercase'
	}
    },
    xAxis: {
	gridLineColor: '#707073',
	labels: {
	    style: {
		color: '#E0E0E3'
	    }
	},
	lineColor: '#707073',
	minorGridLineColor: '#505053',
	tickColor: '#707073',
	title: {
	    style: {
		color: '#A0A0A3'

	    }
	}
    },
    yAxis: {
	gridLineColor: '#707073',
	labels: {
	    style: {
		color: '#E0E0E3'
	    }
	},
	lineColor: '#707073',
	minorGridLineColor: '#505053',
	tickColor: '#707073',
	tickWidth: 1,
	title: {
	    style: {
		color: '#A0A0A3'
	    }
	}
    },
    tooltip: {
	backgroundColor: 'rgba(0, 0, 0, 0.85)',
	style: {
	    color: '#F0F0F0'
	}
    },
    plotOptions: {
	series: {
	    dataLabels: {
		color: '#B0B0B3'
	    },
	    marker: {
		lineColor: '#333'
	    }
	},
	boxplot: {
	    fillColor: '#505053'
	},
	candlestick: {
	    lineColor: 'white'
	},
	errorbar: {
	    color: 'white'
	}
    },
    legend: {
	itemStyle: {
	    color: '#E0E0E3'
	},
	itemHoverStyle: {
	    color: '#FFF'
	},
	itemHiddenStyle: {
	    color: '#606063'
	}
    },
    credits: {
	style: {
	    color: '#666'
	}
    },
    labels: {
	style: {
	    color: '#707073'
	}
    },

    drilldown: {
	activeAxisLabelStyle: {
	    color: '#F0F0F3'
	},
	activeDataLabelStyle: {
	    color: '#F0F0F3'
	}
    },

    navigation: {
	buttonOptions: {
	    symbolStroke: '#DDDDDD',
	    theme: {
		fill: '#505053'
	    }
	}
    },

    // scroll charts
    rangeSelector: {
	buttonTheme: {
	    fill: '#505053',
	    stroke: '#000000',
	    style: {
		color: '#CCC'
	    },
	    states: {
		hover: {
		    fill: '#707073',
		    stroke: '#000000',
		    style: {
			color: 'white'
		    }
		},
		select: {
		    fill: '#000003',
		    stroke: '#000000',
		    style: {
			color: 'white'
		    }
		}
	    }
	},
	inputBoxBorderColor: '#505053',
	inputStyle: {
	    backgroundColor: '#333',
	    color: 'silver'
	},
	labelStyle: {
	    color: 'silver'
	}
    },

    navigator: {
	handles: {
	    backgroundColor: '#666',
	    borderColor: '#AAA'
	},
	outlineColor: '#CCC',
	maskFill: 'rgba(255,255,255,0.1)',
	series: {
	    color: '#7798BF',
	    lineColor: '#A6C7ED'
	},
	xAxis: {
	    gridLineColor: '#505053'
	}
    },

    scrollbar: {
	barBackgroundColor: '#808083',
	barBorderColor: '#808083',
	buttonArrowColor: '#CCC',
	buttonBackgroundColor: '#606063',
	buttonBorderColor: '#606063',
	rifleColor: '#FFF',
	trackBackgroundColor: '#404043',
	trackBorderColor: '#404043'
    },

    // special colors for some of the
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    background2: '#505053',
    dataLabelsColor: '#B0B0B3',
    textColor: '#C0C0C0',
    contrastTextColor: '#F0F0F3',
    maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
var chart1 = new Highcharts.Chart(Highcharts.merge(options1, theme1));
});

