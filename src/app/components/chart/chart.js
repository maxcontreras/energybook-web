/* eslint-disable */
import LineChart from './lineChart';
import BarChart from './barChart';

const todayLabels = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'];
const weekLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const monthLabels = ['1', '5', '10', '15', '20', '25', '30'];
const yearLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export default {
    props: ['meterId', 'chartDataValues'],
    components: {
        LineChart, BarChart
    },
    data() {
        return {
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
            }, {
                options: [
                    { value: 0, text: 'Línea' },
                    { value: 1, text: 'Barra' }  
                ]
            }],
            chartData: {
                labels: todayLabels,
                datasets: [
                    {
                        label: 'EPimp',
                        fill: false,
                        backgroundColor: '#00A6A6',
                        borderColor: '#00A6A6',
                        data: this.chartDataValues
                    }
                ]
            },
            chartOptions: {
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
            },
            currentPeriod: 0,
            periodText: 'day',
            currentDate: moment()
        }
    },
    watch: {
        chartDataValues() {
            this.$refs.mainChart.renderChart(this.chartData, this.chartOptions);
        }
    },
    methods: {
        changePeriod(period) {
            if (period !== null) {
                this.currentPeriod = period;
                switch(period) {
                    case 0:
                    this.chartData.labels = todayLabels;
                    this.periodText = 'day';
                    break;
                    case 1:
                    this.chartData.labels = weekLabels;
                    this.periodText = 'week';
                    break;
                    case 2:
                    this.chartData.labels = monthLabels;
                    this.periodText = 'month';
                    break;
                    case 3:
                    this.chartData.labels = yearLabels;
                    this.periodText = 'year';
                    break;
                }
                this.getByFilter(period)
            }

            this.$refs.mainChart.renderChart(this.chartData, this.chartOptions);
        },
        previous() {
            this.currentDate = moment(this.currentDate).subtract(1, this.periodText);
        },
        next() {
            this.currentDate = moment(this.currentDate).add(1, this.periodText);
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