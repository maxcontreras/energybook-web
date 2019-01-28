/* eslint-disable */
import VChart from '@/app/components/chart/VChart.vue'
import VHeader from '@/app/components/VHeader.vue'
import VTable from '@/app/components/VTable.vue'
import designatedMeters from '@/services/designatedMeters'
import meters from '@/services/meters'

export default {
    props: ['companyIdProp'],
    components: {
        VChart, VHeader, VTable
    },
    computed: {
        isAdmin() {
            return this.$store.state.isAdmin
        },
        companyId() {
            if(this.isAdmin) return this.companyIdProp
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
        }
    },
    data() {
        return {
            graphType: [
                {name: 'Demanda', variable: 'dp'},
                {name: 'Consumo', variable: 'epimp'}
            ],
            metersFilter: {
                selected: "",
                options: [
                    {value: "", text: 'Servicio 1'}
                ]
            },
            eds: [],
            fields: ['Dispositivo', 'Total', 'Máximo', 'Mínimo'],
            items: []
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
            }).then(eds => {
                if (eds.length > 0) {
                    this.eds = eds[0];
                    meters.connectedDevices({
                        id: this.eds.id
                    }).then(devices => {
                        devices.forEach((device, index) => {
                            // Ignore first device. EDS
                            if (index === 0) {
                                this.metersFilter.options[0].value = `${this.eds.meter_id} EDS`;
                                return;
                            }
                            this.metersFilter.options.push({
                                value:`${this.eds.meter_id} ${device.name}`,
                                text: device.description
                            });
                        });
                        this.metersFilter.selected = this.metersFilter.options[0].value;
                    });
                }
            })
        }
    }
}
