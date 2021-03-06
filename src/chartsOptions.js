/* eslint-disable */
var asyncData = {
    name: 'EPimp',
    marker: {
      symbol: 'square'
    },
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
      y: 26.5
    }, 23.3, 18.3, 13.9, 9.6]
}

var dataGauge = {
    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
    },
    title: {
        text: null
    },
    credits: {
        enabled: false
    },
    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [
            {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [[0, '#FFF'], [1, '#333']],
                },
                borderWidth: 0,
                outerRadius: '109%',
            },
            {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [[0, '#333'], [1, '#FFF']],
                },
                borderWidth: 1,
                outerRadius: '107%',
            },
            {
                // default background
            },
            {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%',
            },
        ],
    },
    // the value axis
    yAxis: {
        min: 0,
        max: 20000,
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto',
        },
        title: {
            text: 'kW',
        },
        plotBands: [
            {
                from: 0,
                to: 12000,
                color: '#55BF3B', // green
            },
            {
                from: 12000,
                to: 16000,
                color: '#DDDF0D', // yellow
            },
            {
                from: 16000,
                to: 20000,
                color: '#DF5353', // red
            },
        ],
    },
    series: [
        {
            name: 'DP',
            data: [0],
            tooltip: {
                valueSuffix: ' kW',
            },
        },
    ],
}

var dataLine = {
    chart: {
      type: 'spline'
    },
    title: {
      text: null
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: null
      }
    },
    tooltip: {
      crosshairs: true,
      shared: true
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: '#666666',
          lineWidth: 1
        }
      }
    },
    series: []
}

module.exports.asyncData = asyncData
module.exports.dataGauge = dataGauge
module.exports.dataLine = dataLine