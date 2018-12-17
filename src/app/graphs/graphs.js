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
            metersFilter: [
                {
                    selected: null,
                    options: [
                        {value: null, text: 'Selecciona un dispositivo'}
                    ]
                }
            ],
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
                this.eds = eds[0];
                meters.connectedDevices({
                    id: this.eds.id
                }).then(devices => {
                    devices.forEach((device, index) => {
                        // Ignore first device. EDS
                        if (index === 0) {
                            return;
                        }
                        this.metersFilter[0].options.push({
                            value:`${this.eds.meter_id} ${device}`,
                            text: `Dispositivo ${device}`
                        });
                    });
                    if (this.metersFilter[0].options.length > 1) {
                        // Set default device selected
                        this.metersFilter[0].selected = this.metersFilter[0].options[1].value;
                    }
                });
            })

            // designatedMeters.findOne({
            //     filter: {
            //         where: { company_id: this.companyId }
            //     }
            // }).then(eds => {
            //     this.meters = eds;
            //     this.meters.forEach(meter => {
            //         this.metersFilter[0].options.push({ value: meter.meter_id, text: meter.device_name })
            //     })
            // })
        },
        getData(meter_id) {
            if(meter_id !== null) {

            }
        }
    }
}
