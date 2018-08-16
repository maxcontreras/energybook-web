/* eslint-disable */
import Chart from '@/app/components/chart/Chart.vue';
import Header from '@/app/components/header/Header.vue';
import Table from '@/app/components/table/Table.vue';
import meters from '@/services/meters';

export default {
    components: {
        Chart, Header, Table
    },
    computed: {
        companyId() {
            return this.$store.state.company_id;
        },
        isCosts() {
            return this.$route.name === 'costs';
        },
        title() {
            return this.isCosts? 'Costos': 'Gráficas';
        }
    },
    data() {
        return {
            metersFilter: [{
                selected: null,
                options: [ { value: null, text: 'Selecciona un dispositivo'} ]
            }],
            fields: ['Dispositivo', 'Total', 'Máximo', 'Mínimo'],
            items: []
        }
    },
    beforeMount() {
        this.getMeters();
    },
    methods: {
        changePeriod(period) {
            this.$refs.mainChart.changePeriod(period);
        },
        getMeters() {
            meters.find({
                where: { company_id: this.companyId }
            }).then(meters => {
                this.meters = meters;
                this.meters.forEach(meter => {
                    this.metersFilter[0].options.push({ value: meter.id, text: meter.serial_number });
                });
            });
        }
    }
}