/* eslint-disable */
import Chart from '@/app/components/chart/Chart.vue';
import Header from '@/app/components/header/Header.vue';
import Table from '@/app/components/table/Table.vue';
import designatedMeters from '@/services/designatedMeters';
import meters from '@/services/meters';

export default {
    components: {
        Chart, Header, Table
    },
    computed: {
        isAdmin() {
            return this.$store.state.isAdmin;
        },
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
    watch: {
        companyId() {
            this.getMeters();
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
        this.getByFilter();
    },
    methods: {
        changePeriod(period) {
            this.$refs.mainChart.changePeriod(period);
        },
        getMeters() {
            designatedMeters.find({
                filter: {
                    where: { company_id: this.companyId }
                }
            }).then(meters => {
                this.meters = meters;
                this.meters.forEach(meter => {
                    this.metersFilter[0].options.push({ value: meter.id, text: meter.device_name });
                });
            });
        },
        getByFilter() {
            meters.getReadingsByFilter('5b85b7a58c5a3e1bc0275f6c', 0)
            .then(res => {
                console.log(res);
            });
        }
    }
}