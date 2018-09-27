/* eslint-disable */
import designatedMeters from '@/services/designatedMeters'
import meters from '@/services/meters'
import Table from '@/app/components/table/Table.vue'
import PieChart from '@/app/components/chart/pieChart'
import { gmapApi } from 'vue2-google-maps'
import Weather from 'vue-weather-widget'
import 'vue-weather-widget/dist/css/vue-weather-widget.css'
import VueHighcharts from 'vue2-highcharts'
import VueHighChartsComponent from '@/app/components/chart/VueHighCharts.vue'
import Highcharts from 'highcharts'
import DashboardAdmin from '@/app/dashboard/DashboardAdmin.vue'
import solidGauge from 'highcharts/modules/solid-gauge'
import highchartsMore from 'highcharts/highcharts-more'

highchartsMore(Highcharts);
solidGauge(Highcharts)

const monthLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']


var dataLine = {
    chart: {
      type: 'spline'
    },
    title: {
      text: null
    },
    xAxis: {
      categories: monthLabels
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

var gaugeOptions = {

    chart: {
        type: 'solidgauge'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

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
        tickAmount: 2,
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
    }
};

var asyncData = {
    name: 'EPimp',
    marker: {
      symbol: 'square'
    },
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
      y: 26.5
    }, 23.3, 18.3, 13.9, 9.6]
} 



var position = { lat: '20.663782', lng: '-103.3916394' }
moment.locale('es')
var chartSpeed

function parseDate(rawDate) {
    let hour = rawDate.substring(8, 10)
    return `${hour}:00 hrs`
}

export default {
    components: {
        Table, Weather, PieChart, VueHighcharts , VueHighChartsComponent, DashboardAdmin
    },
    computed: {
        isAdmin() {
            return this.$store.state.isAdmin && this.$route.name === 'dashboard'
        },
        epimpHistory() {
            return this.$store.state.socket.epimpHistory
        },
        distribution() {
            return this.$store.state.socket.distribution
        },
        odometer() {
            return parseFloat(this.$store.state.socket.odometer)
        },
        demand() {
            return this.$store.state.socket.demand
        },
        billablePeriod() {
            let start = moment().startOf('month').format('DD/MM/YYYY')
            let end = moment().endOf('month').format('DD/MM/YYYY')
            return `${start} - ${end}`
        },
        currentFormattedDate() {
            return moment(this.currentDate).format('LLL')
        },
        position() {
            return position
        },
        google: gmapApi
    },
    watch: {
        odometer() {
            this.updateOdometerChart()
        },
        epimpHistory() {
            this.updateEpimpHistoryChart()
        }
    },
    beforeMount() {
        if(this.isAdmin) return

        this.getMeters()
    },
    mounted() {
        if(this.isAdmin) {
            $('.user-dashboard').remove()
            return
        }
        this.load()
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
            lineOptions: dataLine,
            edsId: ''
        }
    },
    methods: {
        load(){
            let lineCharts = this.$refs.lineCharts
            lineCharts.delegateMethod('showLoading', 'Loading...')
            chartSpeed = Highcharts.chart('container-odometer', Highcharts.merge(gaugeOptions, {
                yAxis: {
                    min: 0,
                    max: 200,
                    title: {
                        text: 'DP'
                    }
                },
            
                credits: {
                    enabled: false
                },
            
                series: [{
                    name: 'DP',
                    data: [80],
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                            ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                               '<span style="font-size:12px;color:silver">kW</span></div>'
                    },
                    tooltip: {
                        valueSuffix: ' kW'
                    }
                }]
            
            }));
            if(this.odometer > 0) this.updateOdometerChart()
            if(this.epimpHistory.length > 0) this.updateEpimpHistoryChart()
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
                this.edsId = this.meters[0].meter_id
                //meters.initializer(this.edsId)
            })
        },
        updateEpimpHistoryChart() {
            let xAxis = []
            let data = []
            this.epimpHistory.forEach((obj, index) => {
                //xAxis.push(parseDate(obj.date))
                data.push(parseFloat(obj.value))
            })
            let lineCharts = this.$refs.lineCharts
            let chart = lineCharts.getChart()
            if (!chart.renderer.forExport) {
                lineCharts.delegateMethod('showLoading', 'Loading...');
                lineCharts.removeSeries()
                /*chart.update({
                    xAxis: { categories: xAxis }
                })*/
                asyncData.data = data
                lineCharts.addSeries(asyncData)
                lineCharts.hideLoading()
            }
        },
        updateOdometerChart() {
            /*let chart = this.$refs.gaugeChart.getChart()
            chart.hideLoading()
            if (!chart.renderer.forExport) {
                let point = chart.series[0].points[0]
                point.update(this.odometer)
            }*/
            let point = chartSpeed.series[0].points[0]
            point.update(100)
        }
    }
}
