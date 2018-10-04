/* eslint-disable */
import VueHighcharts from 'vue2-highcharts'
import meters from '@/services/meters'

const todayLabels = ['0 hrs','1 hrs', '2 hrs', '3 hrs', '4 hrs', '5 hrs', '6 hrs', '7 hrs', '8 hrs', '9 hrs', '10 hrs', '11 hrs', '12 hrs', '13 hrs', '14 hrs', '15 hrs', '16 hrs', '17 hrs', '18 hrs', '19 hrs', '20 hrs', '21 hrs', '22 hrs', '23 hrs']
const weekLabels = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

var dataLine = {
    chart: {
        type: 'spline'
    },
    title: {
        text: null
    },
    xAxis: {
        categories: []
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

function parseDate(rawDate) {
    let day, month, year
    day = rawDate.substring(0, 2)
    month = rawDate.substring(2, 4)
    year = rawDate.substring(4, 8)
    return `${day}/${month}/${year}`
}

function mapReadings(arr, parse, xAxis) {
    let data = []
    let val
    arr.forEach(obj => {
        val = parseFloat(obj.value)
        if(parse) {
            val /= 1000
            //val = val.toFixed(2)
            xAxis.push(parseDate(obj.date))
        }
        data.push(val)
    })
    return data
}

export default {
    props: ['meterId', 'variable'],
    components: {
        VueHighcharts
    },
    data() {
        return {
            lineOptions: dataLine,
            dpData: {
                name: 'DP',
                data: []
            },
            epimpData: {
                name: 'EPimp',
                data: []
            },
            buttons: [{
                selected: 0,
                options: [
                    { value: 0, text: 'Hoy' },
                    { value: 1, text: 'Ayer' },
                    { value: 2, text: 'Esta Semana' },
                    { value: 3, text: 'Este Mes' },
                    { value: 4, text: 'Este Año' },
                ]
            }],
            currentPeriod: 0
        }
    },
    watch: {
        meterId() {
            this.changePeriod(0)
        }
    },
    methods: {
        showLoading() {
            let lineCharts = this.$refs.lineCharts
            lineCharts.delegateMethod('showLoading', 'Loading...')
        },
        load() {
            let lineCharts = this.$refs.lineCharts
            lineCharts.addSeries(this.dpData)
            lineCharts.addSeries(this.epimpData)
            lineCharts.hideLoading()
        },
        changePeriod(period) {
            if (period !== null) {
                this.currentPeriod = period

                let chart = this.$refs.lineCharts.getChart()
                let lineCharts = this.$refs.lineCharts

                if (!chart.renderer.forExport) {
                    this.showLoading()
                    lineCharts.removeSeries()
                    this.getByFilter(period, this.meterId, chart)
                }
            }

        },
        getByFilter(filter, meter_id, chart) {
            meters.getReadingsByFilter(meter_id, filter)
                .then(res => {
                    console.log(res)
                    let xAxis = []
                    let parse = false
                    if (this.currentPeriod < 3) {
                        xAxis = this.getxAxis()
                    } else {
                        parse = true
                    }
                    let dpData = mapReadings(res.dp, parse, xAxis)
                    let epimpData = mapReadings(res.epimp)
                    chart.update({
                        xAxis: { categories: xAxis }
                    })
                    this.updateSeries(dpData, epimpData)
                })

        },
        updateSeries(dp, epimp) {
            this.dpData.data = dp
            this.epimpData.data = epimp
            this.load()
        },
        getxAxis() {
            if(this.currentPeriod < 2) return todayLabels
            return weekLabels
        }
    }
}