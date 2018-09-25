/* eslint-disable */
import Chart from '@/app/components/chart/Chart.vue'
import Header from '@/app/components/header/Header.vue'
import Table from '@/app/components/table/Table.vue'
import designatedMeters from '@/services/designatedMeters'
import meters from '@/services/meters'

export default {
    components: {
        Chart, Header, Table
    },
    computed: {
        isAdmin() {
            return this.$store.state.isAdmin
        },
        companyId() {
            return this.$store.state.company_id
        },
        isCosts() {
            return this.$route.name === 'costs'
        },
        title() {
            return this.isCosts? 'Costos': 'Gráficas'
        }
    },
    watch: {
        companyId() {
            this.getMeters()
        },
        chartData() {
            if(this.chartData.length > 0)
                this.updateChart()
        }
    },
    data() {
        return {
            metersFilter: [{
                selected: null,
                options: [ { value: null, text: 'Selecciona un dispositivo'} ]
            }],
            fields: ['Dispositivo', 'Total', 'Máximo', 'Mínimo'],
            items: [],
            chartData: []
        }
    },
    beforeMount() {
        this.getMeters()
    },
    methods: {
        getMeters() {
            designatedMeters.find({
                filter: {
                    where: { company_id: this.companyId }
                }
            }).then(meters => {
                this.meters = meters
                this.meters.forEach(meter => {
                    this.metersFilter[0].options.push({ value: meter.meter_id, text: meter.device_name })
                })
            })
        },
        getData(meter_id) {
            if(meter_id !== null) {
                console.log(meter_id)
                //this.$refs.chart.showLoading()
                //this.$refs.chart.changePeriod(0)
                /*
                this.chartData = []
                meters.getReadingsByFilter(meter_id, 0)
                .then(res => {
                    console.log(res)
                    let records = res.deviceVars.recordGroup.record
                    for(let i = 0; i < records.length; i ++) {
                        this.chartData.push(parseFloat(records[i].field.value._text))
                    }
                })*/
            }
        },
        updateChart() {
            this.$refs.chart.updateSeries(this.chartData)
        }
    }
}