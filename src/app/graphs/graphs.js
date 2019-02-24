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
                options: []
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
                    include: ['services'],
                    where: { company_id: this.companyId }
                }
            }).then(eds => {
                if (eds.length > 0) {
                    this.eds = eds[0];
                    if (this.eds.services) {
                        this.eds.services.forEach(service => {
                            this.metersFilter.options.push({
                                value:`${this.eds.meter_id}*EDS*${service.serviceName}`,
                                text: service.serviceName
                            });
                        });
                    }
                    meters.connectedDevices({
                        id: this.eds.id
                    }).then(devices => {
                        devices.forEach((device, index) => {
                            // Ignore first device. EDS
                            if (index === 0) return;
                            this.metersFilter.options.push({
                                value:`${this.eds.meter_id}*${device.name}`,
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
