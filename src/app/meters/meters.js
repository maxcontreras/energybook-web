/* eslint-disable */
import meters from '@/services/meters';
import designatedMeters from '@/services/designatedMeters';
import companies from '@/services/companies';
import Header from '@/app/components/header/Header.vue';
import Table from '@/app/components/table/Table.vue';
import Constants from '@/constants';

const meterActive = Constants.Meters.active;

export default {
    components: {
        Header, Table
    },

    computed: {
        isAdmin() {
            return this.$store.state.isAdmin;
        },
        companyId() {
            return this.$store.state.company_id;
        },
    },

    data() {
        return {
            meters: [],
            designatedMeters: [],
            items: [],
            itemsDesignated: [],
            fields: [{
                key: 'No. de Serie',
                sortable: true,
                label: 'No. de Serie'
            }, 'Fecha de Registro', 'Estado'],
            fieldsDesignated: [{
                key: 'Nombre',
                sortable: true,
                label: 'Nombre'
            }, 'Num. de serie', 'Hostname', 'Asignado el',  'Compañía', 'Status'],
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
            companies: [ { value: null, text: 'Selecciona una compañía'} ],
            bcItems: [{
                text: 'Medidores',
                active: true
            }]
        }
    },

    watch: {
        companyId() {
            this.getDesignatedMeters();
        }
    },

    beforeMount() {
        this.getMeters();
        this.getCompanies();
        this.getDesignatedMeters();
    },

    methods: {
        getMeters() {
            meters.unassignedMeters().then(res => {
                this.meters = res.meters;
                this.meters.forEach(meter => {
                    this.items.push({
                        'No. de Serie': meter.serial_number,
                        'Fecha de Registro': moment(meter.created_at).format('LL'),
                        'Estado': meterActive[meter.active],
                        id: meter.id
                    });
                });
            });
        },

        getDesignatedMeters() {
            let filter = {
                filter: {
                    include: ['meter','company']
                }
            };
            if(!this.isAdmin) {
                filter.where = {
                    company_id: this.companyId
                }
            }
            designatedMeters.find({
                filter
            }).then(designatedMeters => {
                this.designatedMeters = designatedMeters;
                this.designatedMeters.forEach(meter => {
                    console.log(meter);
                    meters.getOwnerCompany({meter_id: meter.meter_id}).then(company => {
                        this.itemsDesignated.push({
                            'Nombre': meter.device_name,
                            'Num. de serie': company.company.meter_serial_number,
                            'Hostname': meter.hostname,
                            'Asignado el': moment(meter.created_at).format('LL'),
                            'Compañía': company.company.name,
                            'Status': meterActive[company.company.meter_status],
                            id: meter.id
                        });
                    });
                });
            });
        },

        getCompanies() {
            companies.find({}).then(companies => {
                companies.forEach(company => {
                    this.companies.push({ value: company.id, text: company.company_name} );
                });
            });
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
                });
            })
        },
        assignMeter() {
            designatedMeters.create({
                data: this.newDesignatedMeter
            }).then(res => {
                meters.getOwnerCompany({meter_id: res.meter_id})
                .then(meter => {
                    this.items.splice(this.currentIndex, 1);
                    this.itemsDesignated.push({
                        'Nombre': res.device_name,
                        'Num. de serie': res.company.meter_serial_number,
                        'Hostname': res.hostname,
                        'Asignado el': moment(res.created_at).format('LL'),
                        'Compañía': meter.company.name,
                        'Estado': meterActive[meter.company.meter_status],
                        id: res.id
                    })
                });
            })
        },
        openAssignModal(value) {
            this.newDesignatedMeter.meter_id = value.id;
            this.currentIndex = value.index;
            this.$refs.meterModalDesignate.show();
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
        }
    }
}

// validate fields
