/* eslint-disable */
import VueHighcharts from 'vue2-highcharts'

const todayLabels = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'];
const weekLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const monthLabels = ['1', '5', '10', '15', '20', '25', '30'];
const yearLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

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
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
      y: 26.5
    }, 23.3, 18.3, 13.9, 9.6]
} 

export default {
    props: ['meterId', 'chartDataValues'],
    components: {
        VueHighcharts
    },
    data() {
        return {
            lineOptions: dataLine,
            currentChart: 0,
            buttons: [{
                selected: 0,
                options: [
                    { value: 0, text: 'Hoy' },
                    { value: 1, text: 'Ayer' },
                    { value: 2, text: 'Esta Semana' },
                    { value: 3, text: 'Este Mes' },
                    { value: 3, text: 'Este Año' },
                ]
            }],
            currentPeriod: 0,
            periodText: 'day',
            currentDate: moment()
        }
    },
    watch: {
        chartDataValues() {
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            let lineCharts = this.$refs.lineCharts;
            lineCharts.delegateMethod('showLoading', 'Loading...');
            setTimeout(() => {
                lineCharts.addSeries(asyncData);
                lineCharts.hideLoading();
            }, 2000)
        },
        changePeriod(period) {
            if (period !== null) {
                this.currentPeriod = period;
                let xAxis = []
                switch(period) {
                    case 0:
                    xAxis = todayLabels;
                    this.periodText = 'day';
                    break;
                    case 1:
                    xAxis = todayLabels;
                    this.periodText = 'day';
                    break;
                    case 2:
                    xAxis = weekLabels;
                    this.periodText = 'week';
                    break;
                    case 3:
                    xAxis = monthLabels;
                    this.periodText = 'month';
                    break;
                    case 4:
                    xAxis = yearLabels;
                    this.periodText = 'year';
                    break;
                }
                this.getByFilter(period)

                let chart = this.$refs.lineCharts.getChart()

                if (!chart.renderer.forExport) {
                    chart.update({
                        xAxis: { categories: xAxis }
                    })
                    let point = chart.series[0].points[0]
                    point.update(0)
                }
            }

        },
        getByFilter(filter) {
            console.log(this.meterId);
            /*meters.getReadingsByFilter('5b85b7a58c5a3e1bc0275f6c', 0)
            .then(res => {
                console.log(res);
            });*/
            
        }
    },
}