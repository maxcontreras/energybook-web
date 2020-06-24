/* eslint-disable */
import meters from '@/services/meters'
import designatedMeters from '@/services/designatedMeters';
import companies from '@/services/companies'
import MeterForm from '@/app/meters/MeterForm.vue'
import VHeader from '@/app/components/VHeader.vue'
import VTable from '@/app/components/VTable.vue'
import MeterData from './MeterData.vue';
import notify from '@/mixins/notify';

export default {
    components: {
        VHeader,
        VTable,
        MeterForm,
        MeterData
    },

    mixins: [notify('notification')],

    data() {
        return {
            fieldsDesignated: [
                {key: 'Compañía'},
                {key: 'Nombre', sortable: true, label: 'EDS'},
                {key: 'Hostname'},
                {key: 'Num. de serie'},
                {key: 'Asignado el'},
                {key: 'Status', label: 'Estado'},
                {key: 'Delete', label: 'Eliminar'},
                {key: 'Max', label: "Código de red"}
            ],
            companies: [
                {value: null, text: 'Selecciona una compañía'}
            ],
            connectedDevices: [],
            generationDevices: [],
            showMeterForm: false,
            shownMeter: {},
            shownServices: []
        }
    },

    computed: {
        isAdmin() {
            return this.$store.state.isAdmin
        },
        isAdminNormal(){
            if (JSON.parse(localStorage.getItem('user')).Administrando == undefined) {
                return this.$store.state.isadminNormal = false
            } else {
                return this.$store.state.isadminNormal = true
            }

        },
        CompañiasAdministradas(){
            return JSON.parse(localStorage.getItem('user')).Administrando
        },
        companyId() {
            // TODO check this computed propertie
            return this.$store.state.company_id
        },
        metersAssigned() {
            return this.$store.getters['meter/getAssignatedMeters'];
        },
        metersAssignedFormatted() {
            // quitar el foreach y hacerlo manual si no funciona mover mediante banderas el let f_meter afuera del
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
        }
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
            if(JSON.parse(localStorage.getItem('user')).Administrando!= null){
            var companyID = JSON.parse(localStorage.getItem('user')).company_id;
            companies.find({   filter: {
                where: { id: companyID }
            }}).then(empresa=>{

                this.$store.dispatch('meter/LOADINGMETERS', {isAdmin: true, administrando: empresa[0].Administrando})
                .catch(err => {
                    console.log(err);
                });

            })


            }else{
                this.$store.dispatch('meter/loadAssignedMeters', true)
                .catch(err => {
                    console.log(err);
                });

            }
        },

        getCompanies() {
            if(JSON.parse(localStorage.getItem('user')).Administrando!= null){
                let companyId = JSON.parse(localStorage.getItem('user')).company_id;
                companies.find({
                    filter: {
                        where: { id: companyId }
                    }
                }).then(compañias =>{

                    var administrando = compañias[0].Administrando
                    companies.find({}).then(companies => {
                        companies.forEach(company => {
                            administrando.forEach(companyid => {
                                if(companyid==company.id){

                                    this.companies.push({ value: company.id, text: company.company_name} )
                                }
                            });


                        })
                    })

                })

            }else{
                companies.find({}).then(companies => {
                    companies.forEach(company => {
                        if(company.administra == null){
                            this.companies.push({ value: company.id, text: company.company_name} )
                        }

                    })
                })

            }

        },

        createMeter(meter) {
            this.hideMeterForm();
            this.$store.dispatch('meter/createMeter', meter)
                .then(res => {
                    console.log(res)
                    this.notify('', 'Medidor creado exitosamente', 'success');
                })
                .catch((err) => {
                    console.log(err)
       
                  
                    this.notify('', 'Error al crear medidor', 'error');
                });
        },

        verifyServices() {
            return this.shownServices.reduce((prev, curr) => prev && (curr.selected.length > 0), true);
        },

        editMeter() {
            if (!this.verifyServices()) {
                this.notify('', 'Debe haber al menos un dispositivo por servicio', 'warn');
                return;
            }
            const selectedServices = {};
            for (const service of this.shownServices) {
                selectedServices[service.name] = service.selected;
            }
            this.$store.dispatch('meter/editAssignedMeter', {meter: this.shownMeter, services: selectedServices, generation: this.generationDevices})
                .then(() => {
                    this.notify('', 'Medidor actualizado', 'success');
                })
                .catch(err => {
                    console.log(err);
                    this.notify('', 'Error al editar medidor', 'error');
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

            this.generationDevices = this.shownMeter.generationDevices;

            this.connectedDevices = {};
            this.$refs.edsDataModal.show();

            meters.connectedDevices({id: value.id})
                .then(devices => {
                    if(devices){
                        this.connectedDevices = devices.map(device =>
                            ({
                                text: device.description,
                                value: device.name
                            })
                        ).filter((device, idx) => idx !== 0);
                    }
                });
        },

        deleteMeter(meter) {
            designatedMeters.deleteMeterWithServices(meter.id)
                .then(() => {
                    this.$store.dispatch('meter/loadAssignedMeters');
                    this.notify('', 'Medidor eliminado exitosamente', 'success');
                })
                .catch(err => {
                    console.log(err);
                    this.notify('', 'Error al borrar medidor', 'error');
                });
        }
    }
}
