/* eslint-disable */
import designatedMeters from '@/services/designatedMeters'
import Table from '@/app/components/table/Table.vue'
import GaugeChart from '@/app/components/gaugeChart/GaugeChart.vue'
import PieChart from '@/app/components/chart/pieChart'
import {gmapApi} from 'vue2-google-maps'
import Weather from 'vue-weather-widget'
import 'vue-weather-widget/dist/css/vue-weather-widget.css'

var position = {lat:'20.663782', lng:'-103.3916394'}
moment.locale('es')

export default {
    components: {
        Table, Weather,  GaugeChart, PieChart
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
            chartOptions: {}
        }
    },
    methods: {
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
                let opacityIndex = 1/metersCount
                let currentOpacity = 1
                this.meters.forEach(meter => {
                    this.chartData.labels.push(meter.device_name)
                    this.chartData.datasets[0].backgroundColor.push(`rgba(132, 185, 46, ${currentOpacity})`)
                    currentOpacity -= opacityIndex
                })
                this.$refs.mainChart.renderChart(this.chartData, this.chartOptions);
            })
        }
    }
}
