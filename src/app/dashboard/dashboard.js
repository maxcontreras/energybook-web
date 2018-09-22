/* eslint-disable */
import designatedMeters from '@/services/designatedMeters'
import Table from '@/app/components/table/Table.vue'
import GaugeChart from '@/app/components/gaugeChart/GaugeChart.vue'
import PieChart from '@/app/components/chart/pieChart'
import { gmapApi } from 'vue2-google-maps'
import Weather from 'vue-weather-widget'
import 'vue-weather-widget/dist/css/vue-weather-widget.css'
import VueHighcharts from 'vue2-highcharts'
import VueHighChartsComponent from '@/app/components/chart/VueHighCharts.vue'
import Highcharts from 'highcharts'
const More = require('highcharts-more')

More(Highcharts)
let timer = null

const pieData = {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {
        text: null
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        pie: {
            innerSize: 100,
            depth: 45
        }
    },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    },
    legend: {
        enabled: true,
        layout: 'vertical',
        align: 'middle',
        width: 165,
        height: 100
    },
    series: [{
        name: 'Delivered amount',
        data: [
            ['Bananas', 8],
            ['Kiwi', 3],
            ['Mixed nuts', 1],
            ['Oranges', 6],
            ['Apples', 8],
            ['Pears', 4],
            ['Clementines', 4],
            ['Reddish (bag)', 1],
            ['Grapes (bunch)', 1]
        ]
    }]
}
const asyncData = {
    name: 'EPimp',
    marker: {
      symbol: 'square'
    },
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
      y: 26.5
    }, 23.3, 18.3, 13.9, 9.6]
  }

const dataGauge = {
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
        max: 200,
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
            text: 'km/h',
        },
        plotBands: [
            {
                from: 0,
                to: 120,
                color: '#55BF3B', // green
            },
            {
                from: 120,
                to: 160,
                color: '#DDDF0D', // yellow
            },
            {
                from: 160,
                to: 200,
                color: '#DF5353', // red
            },
        ],
    },
    series: [
        {
            name: 'Speed',
            data: [80],
            tooltip: {
                valueSuffix: ' kW',
            },
        },
    ],
}

var position = { lat: '20.663782', lng: '-103.3916394' }
moment.locale('es')

function setGaugeChartStyles() {
    $(".gauge-chart-container .highcharts-plot-background").attr("height", "0")
    $(".gauge-chart-container .highcharts-plot-border").attr("height", "0")
    $(".gauge-chart-container .highcharts-background").attr("height", "0")
    $('.gauge-chart-container .highcharts-root').attr('viewBox', '0 100 200 200')
    $('.gauge-chart-container .highcharts-root').attr('width', '200')
    $('.gauge-chart-container .highcharts-root').attr('height', '200')
    $('.gauge-chart-container .highcharts-container ').css({ 'height': '200px' })
}

export default {
    components: {
        Table, Weather, GaugeChart, PieChart, VueHighcharts, VueHighChartsComponent
    },
    computed: {
        billablePeriod() {
            let start = moment().startOf('month').format('DD/MM/YYYY')
            let end = moment().endOf('month').format('DD/MM/YYYY')
            return `${start} - ${end}`
        },
        currentFormattedDate() {
            return moment(this.currentDate).format('LL')
        },
        position() {
            return position
        },
        google: gmapApi
    },
    beforeMount() {
        this.getMeters()
    },
    data() {
        return {
            meters: [],
            dpVal: 0,
            epimpVal: 0,
            companyId: JSON.parse(localStorage.getItem('user')).company_id,
            chartData: {
                datasets: [{
                    data: [100],
                    backgroundColor: []
                }],
                labels: []
            },
            chartOptions: {},
            gaugeOptions: dataGauge,
            pieOptions: pieData,
            lineOptions: {
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
                  },
                  labels: {
                    formatter: function () {
                      return this.value + '°';
                    }
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
        }
    },
    methods: {
        load(){
            let lineCharts = this.$refs.lineCharts;
            lineCharts.delegateMethod('showLoading', 'Loading...');
            setTimeout(() => {
                lineCharts.addSeries(asyncData);
                lineCharts.hideLoading();
            }, 2000)
        },
        getMeters() {
            designatedMeters.find({
                filter: {
                    where: {
                        company_id: this.companyId
                    }
                }
            }).then(res => {
                this.meters = res
                let metersCount = this.meters.length
                let opacityIndex = 1 / metersCount
                let currentOpacity = 1
                this.meters.forEach(meter => {
                    this.chartData.labels.push(meter.device_name)
                    this.chartData.datasets[0].backgroundColor.push(`rgba(132, 185, 46, ${currentOpacity})`)
                    currentOpacity -= opacityIndex
                })
                //this.$refs.mainChart.renderChart(this.chartData, this.chartOptions);
            })
        }
    },
    mounted() {
        const chart = this.$refs.gaugeChart.getChart()
        setGaugeChartStyles()
        this.load()

        if (!chart.renderer.forExport) {
            timer = setInterval(function () {
                let point = chart.series[0].points[0],
                    newVal,
                    inc = Math.round((Math.random() - 0.5) * 20)
                newVal = point.y + inc
                if (newVal < 0 || newVal > 200) {
                    newVal = point.y - inc
                }
                point.update(newVal)
            }, 3000)
        }
    },
    destroyed() {
        if (timer) {
            clearInterval(timer)
        }
    }
}
