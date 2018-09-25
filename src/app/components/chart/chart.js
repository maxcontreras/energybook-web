/* eslint-disable */
import VueHighcharts from 'vue2-highcharts'
import meters from '@/services/meters'

const todayLabels = ['1','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
const weekLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const monthLabels = ['1','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
const yearLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

var dataLine = {
    chart: {
        type: 'spline'
    },
    title: {
        text: null
    },
    xAxis: {
        categories: todayLabels
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

var asyncData = {
    name: 'EPimp',
    marker: {
        symbol: 'square'
    },
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

export default {
    props: ['meterId', 'chartDataValues'],
    components: {
        VueHighcharts
    },
    data() {
        return {
            lineOptions: dataLine,
            asyncData: asyncData,
            currentChart: 0,
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
            currentPeriod: 0,
            currentDate: moment()
        }
    },
    watch: {
        meterId() {
            console.log(this.meterId)
            this.changePeriod(0)
        }
    },
    mounted() {
    },
    methods: {
        showLoading() {
            let lineCharts = this.$refs.lineCharts
            lineCharts.delegateMethod('showLoading', 'Loading...')
        },
        load() {
            let lineCharts = this.$refs.lineCharts
            lineCharts.addSeries(this.asyncData)
            lineCharts.hideLoading()
        },
        changePeriod(period) {
            if (period !== null) {
                this.currentPeriod = period
                let xAxis = []
                switch (period) {
                    case 0:
                        xAxis = todayLabels
                        break
                    case 1:
                        xAxis = todayLabels
                        break
                    case 2:
                        xAxis = weekLabels
                        break
                    case 3:
                        xAxis = monthLabels
                        break
                    case 4:
                        xAxis = yearLabels
                        break
                }


                let chart = this.$refs.lineCharts.getChart()
                let lineCharts = this.$refs.lineCharts

                if (!chart.renderer.forExport) {
                    this.showLoading()
                    lineCharts.removeSeries()
                    chart.update({
                        xAxis: { categories: xAxis }
                    })
                    this.getByFilter(period, this.meterId)
                }
            }

        },
        getByFilter(filter, meter_id) {
            console.log('filter')
            let chartData = []
            meters.getReadingsByFilter(meter_id, filter)
                .then(res => {
                    console.log(res)
                    let records = res.deviceVars.recordGroup.record
                    for(let i = 0; i < records.length; i ++) {
                        chartData.push(parseFloat(records[i].field.value._text))
                        if(this.currentPeriod === 4) {
                            function parseDate(rawDate) {
                                let day, month, year
                                day = rawDate.substring(0, 2)
                                month = rawDate.substring(2, 4)
                                year = rawDate.substring(4, 8)
                                return `${day}/${month}/${year}`
                            }
                            console.log(records[i].dateTime._text)
                            console.log(parseDate(records[i].dateTime._text))
                        }
                    }
                    this.updateSeries(chartData)
                })

        },
        updateSeries(data) {
            this.asyncData.data = data
            this.load()
        }
    },
}