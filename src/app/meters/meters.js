/* eslint-disable */
import meters from '@/services/meters'
import companies from '@/services/companies'
import MeterForm from '@/app/meters/MeterForm.vue'
import VHeader from '@/app/components/VHeader.vue'
import VTable from '@/app/components/VTable.vue'
import MeterData from './MeterData.vue';

export default {
    components: {
        VHeader,
        VTable,
        MeterForm,
        MeterData
    },

    data() {
        return {
            fieldsDesignated: [
                {key: 'Compañía'},
                {key: 'Nombre', sortable: true, label: 'EDS'},
                {key: 'Hostname'},
                {key: 'Num. de serie'},
                {key: 'Asignado el'},
                {key: 'Status', label: 'Estado'},
            ],
            companies: [
                {value: null, text: 'Selecciona una compañía'}
            ],
            connectedDevices: [],
            showMeterForm: false,
            shownMeter: {},
            shownServices: []
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
        metersAssigned() {
            return this.$store.getters['meter/getAssignatedMeters'];
        },
        metersAssignedFormatted() {
            return this.metersAssigned.map(meter => {
                let f_meter = {
                    'Compañía': meter.company_name,
                    'Nombre': meter.device_name,
                    'Hostname': meter.hostname,
                    'Num. de serie': meter.serial_number,
                    'Asignado el': moment(meter.created_at).format('LL'),
                    'Status': meter.status,
                    id: meter.id,
                    meter_id: meter.meter_id
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
        this.getCompanies();
        this.getDesignatedMeters();
    },

    methods: {

        getDesignatedMeters() {
            this.$store.dispatch('meter/loadAssignedMeters', true)
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

        createMeter(meter) {
            this.hideMeterForm();
            this.$store.dispatch('meter/createMeter', meter)
                .then(res => {
                    this.$notify({
                        group: 'notification',
                        type: 'success',
                        text: 'Medidor creado exitósamente'
                    });
                })
                .catch(() => {
                    this.$notify({
                        group: 'notification',
                        type: 'error',
                        text: 'Error al crear medidor'
                    });
                });
        },

        verifyServices() {
            return this.shownServices.reduce((prev, curr) => prev && (curr.selected.length > 0), true);
        },

        editMeter() {
            if (!this.verifyServices()) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    text: 'Debe haber al menos un dispositivo por servicio'
                });
                return;
            }
            const selectedServices = {};
            for (const service of this.shownServices) {
                selectedServices[service.name] = service.selected;
            }
            this.$store.dispatch('meter/editAssignedMeter', {meter: this.shownMeter, services: selectedServices})
                .then(() => {
                    this.$notify({
                        group: 'notification',
                        type: 'success',
                        text: 'Medidor actualizado'
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.$notify({
                        group: 'notification',
                        type: 'error',
                        text: 'Error al editar medidor'
                    });
                });
        },

        openMeterForm() {
            this.showMeterForm = true;
        },

        hideMeterForm() {
            this.showMeterForm = false;
        },

        openEDSDataModal(value) {
            // Get meter from selected item
            const index = this.metersAssigned.findIndex(meter => meter.id == value.id);
            let meter = this.metersAssigned[index];
            this.shownMeter = Object.assign({}, meter);

            this.shownServices = this.shownMeter.services.map(service => {
                const selected = service.devices.slice(1).map(device => device.name);
                const options = this.shownMeter.devices.slice(1).map(device =>
                    ({
                        text: device.description,
                        value: device.name
                    })
                );
                return {name: service.serviceName, selected, options};
            });

            this.connectedDevices = {};
            this.$refs.edsDataModal.show();

            meters.connectedDevices({id: value.id})
                .then(devices => {
                    if(devices){
                        this.connectedDevices = devices;
                    }
                });
        }
    }
}
