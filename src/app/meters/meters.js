/* eslint-disable */
import meters from '@/services/meters'
import designatedMeters from '@/services/designatedMeters'
import companies from '@/services/companies'
import MeterForm from '@/app/meters/MeterForm.vue'
import VHeader from '@/app/components/VHeader.vue'
import VTable from '@/app/components/VTable.vue'
import Constants from '@/constants'

const meterActive = Constants.Meters.active

export default {
    components: {
        VHeader,
        VTable,
        MeterForm
    },

    data() {
        return {
            items: [],
            itemsDesignated: [],
            fields: [
                {key: 'No. de Serie',sortable: true, label: 'No. de Serie'},
                'Fecha de Registro',
                'Estado'
            ],
            fieldsDesignated: [
                {key: 'Compañía'},
                {key: 'Nombre', sortable: true, label: 'EDS'},
                {key: 'Hostname'},
                {key: 'Num. de serie'},
                {key: 'Asignado el'},
                {key: 'Status', label: 'Estado'}
            ],
            newMeter: {
                serial_number: '',
                created_at: new Date()
            },
            newDesignatedMeter: {
                device_name: '',
                created_at: new Date(),
                company_id: null,
                meter_id: ''
            },
            currentIndex: 0,
            companies: [
                {value: null, text: 'Selecciona una compañía'}
            ],
            connectedDevices: [],
            bcItems: [{
                text: 'Medidores',
                active: true
            }]
        }
    },

    computed: {
        isAdmin() {
            return this.$store.state.isAdmin
        },
        companyId() {
            // TODO check this computed propertie
            return this.$store.state.company_id
        },
        meters: function() {
            return this.$store.getters['meter/getMeters'];
        },
        metersFormatted: function() {
            return this.meters.map(meter => {
                let f_meter = {
                    'No. de Serie': meter.serial_number,
                    'Fecha de Registro': moment(meter.created_at).format('LL'),
                    'Estado': meterActive[meter.active],
                    id: meter.id
                }
                return f_meter;
            });
        },
        metersAssigned: function() {
            return this.$store.getters['meter/getAssignatedMeters'];
        },
        metersAssignedFormatted: function() {
            return this.metersAssigned.map(meter => {
                let f_meter = {
                    'Compañía': meter.company_name,
                    'Nombre': meter.device_name,
                    'Hostname': meter.hostname,
                    'Num. de serie': meter.serial_number,
                    'Asignado el': moment(meter.created_at).format('LL'),
                    'Status': meter.status,
                    id: meter.id
                }
                return f_meter;
            });
        },
    },

    watch: {
        companyId(newVal, oldVal) {
            if (newVal) {
                this.getDesignatedMeters()
            }
        }
    },

    beforeMount() {
        this.getMeters()
        this.getCompanies()
        this.getDesignatedMeters()
    },

    methods: {
        getMeters() {
            this.$store.dispatch('meter/loadUnassignedMeters')
            .then(res => {})
            .catch(err =>  {
                console.log(err);
            })
        },

        getDesignatedMeters() {
            this.$store.dispatch('meter/loadAssignedMeters')
                .then(meters =>  {
                    this.designatedMeters = meters;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getCompanies() {
            companies.find({}).then(companies => {
                companies.forEach(company => {
                    this.companies.push({ value: company.id, text: company.company_name} )
                })
            })
        },

        createMeter() {
            meters.create({
                data: this.newMeter
            })
            .then(meter => {
                this.items.push({
                    'No. de Serie': meter.serial_number,
                    'Fecha de Registro': moment(meter.created_at).format('LL'),
                    'Estado': meterActive[meter.active],
                    id: meter.id
                })
            })
        },

        assignMeter() {
            companies.designateMeter({data: this.newDesignatedMeter})
                .then(res => {
                    meters.getAssigned({id: res.meter_id})
                        .then(res => {
                            this.clearNewDesignatedMeter();
                            this.items.splice(this.currentIndex, 1)
                            const assigned = res.meters;
                            if (assigned && assigned.length > 0) {
                                const meter = assigned[assigned.length - 1];
                                this.itemsDesignated.push({
                                    'Compañía': meter.company.company_name,
                                    'Nombre': meter.device_name,
                                    'Hostname': meter.hostname,
                                    'Num. de serie': meter.meter.serial_number,
                                    'Asignado el': moment(meter.created_at).format('LL'),
                                    'Estado': meterActive[meter.company.status],
                                    'id': meter.id
                                });
                            }
                        })
                        .catch(err =>  {
                            console.log(err);
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
        },

        editMeter() {
            meters.updateDesignatedMeter({data: this.newDesignatedMeter})
                .then(res => {
                    this.clearNewDesignatedMeter();
                    console.log(res)
                })
                .catch(err => {
                    console.error(err);
                });
        },

        openAssignModal(value) {
            this.clearNewDesignatedMeter();
            this.newDesignatedMeter.meter_id = value.id
            this.currentIndex = value.index
            this.$refs.meterModalDesignate.show()
        },

        openEDSDataModal(value) {
            // Get meter from selected item
            const index = this.metersAssigned.findIndex(meter => meter.id == value.id);
            let meterSelected = this.designatedMeters[index];
            this.newDesignatedMeter = meterSelected;

            this.connectedDevices = {};
            this.$refs.edsDataModal.show();

            meters.connectedDevices({id: value.id})
                .then(devices => {
                    if(devices){
                        this.connectedDevices = devices;
                    }
                });
        },

        clearNewMeter() {
            this.newMeter = {
                serial_number: '',
                created_at: new Date()
            }
        },

        clearNewDesignatedMeter() {
            this.newDesignatedMeter = {
                device_name: '',
                created_at: new Date(),
                company_id: null,
                meter_id: ''
            }
        },

        statusChange(val) {
            console.log(val)
        }
    }
}

// validate fields
