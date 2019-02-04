<template>
    <b-row class="main">
        <b-col>
            <b-row class="header">
                <div class="filters-container">
                    <b-form-select
                        v-model="metersFilter.selected"
                        :options="metersFilter.options" class="mb-3" />
                </div>
            </b-row>
            <b-row id="net-code-graphs">
                <b-col>
                    <b-card
                        class="margin-bottom-1"
                        v-show="metersFilter.selected !== null">
                        <div class="graphs">
                            <div class="date-buttons--container container-fluid">
                                <b-row>
                                    <b-col md="5" class="text-left">
                                        <b-button
                                            v-for="(type, index) in graphType.options"
                                            :key="index + 1"
                                            :class="{
                                                'btn-success': graphType.selected === index,
                                                'btn-outline-success': graphType.selected !== index
                                                }"
                                            @click="changeType(index)"
                                            >
                                            {{ type.name }}
                                        </b-button>
                                    </b-col>
                                    <b-col md="7" class="text-right">
                                        <div
                                            class="datepickers"
                                            v-if="showDatePicker">
                                            <date-picker
                                                placeholder="Desde"
                                                v-model="date_custom.from"
                                                :config="dateConfig">
                                            </date-picker>
                                            <date-picker
                                                placeholder="Hasta"
                                                v-model="date_custom.until"
                                                :config="dateConfig">
                                            </date-picker>
                                        </div>
                                        <b-button
                                            v-for="(button, index) in graphPeriod.options"
                                            :key="index"
                                            :class="{
                                                'btn-success': graphPeriod.selected === button.value,
                                                'btn-outline-success': graphPeriod.selected !== button.value
                                                }"
                                            @click="changePeriod(button.value)">
                                            {{ button.text }}
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                    </b-card>
                    <b-alert
                        show
                        variant="info"
                        v-if="metersFilter.selected === null">
                        Selecciona un medidor para desplegar la gráfica.
                    </b-alert>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>
<script>
/* eslint-disable */
import designatedMeters from '@/services/designatedMeters';
import datePicker from 'vue-bootstrap-datetimepicker';
import meters from '@/services/meters';

export default {

    components: {
        datePicker
    },

    data() {
        return {
            metersFilter: {
                selected: "",
                options: [
                    {value: "", text: 'Servicio 1'}
                ]
            },
            date_custom: {
                from: null,
                until: null
            },
            dateConfig: {
                format: 'YYYY-MM-DD',
                useCurrent: false
            },
            dangerAlert: false,
            showDatePicker: false,
            eds: [],
            graphPeriod: {
                selected: 0,
                options: [
                    {value: -1, text: 'Calendario'},
                    {value: 0, text: 'Hoy'},
                    {value: 1, text: 'Ayer'},
                    {value: 2, text: 'Esta Semana'},
                    {value: 3, text: 'Este Mes'},
                    {value: 4, text: 'Este Año'},
                ]
            },
            graphType: {
                selected: 0,
                options: [
                    { variables: ['Vab', 'Vbc', 'Vca'], name: 'Voltaje' },
                    { variables: ['la', 'lb', 'lc'], name: 'Amperaje' },
                    { variables: ['TDHla', 'TDHlb', 'TDHlc'], name: 'THD' },
                    { variables: ['Vunbl', 'lunbl'], name: 'Desbalance Variable' },
                    { variables: ['ES'], name: 'kVA' }
                ]
            }
        }
    },

    watch: {
        companyId() {
            this.getMeters();
        },
        meterSelected() {
            this.showDatePicker = false;
            if (this.dangerAlert) this.dangerAlert = false;
            setTimeout(() => {
                this.changePeriod(0);
            }, 100);
        }
    },

    computed: {
        companyId() {
            return this.$store.state.company_id;
        },
        meterSelected() {
            return this.metersFilter.selected;
        }
    },

    beforeMount() {
        this.getMeters();
    },

    methods: {
        getMeters() {
            designatedMeters.find({
                filter: {
                    where: { company_id: this.companyId }
                }
            }).then(eds => {
                if (!eds[0]) return;
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
            });
        },
        changeType(new_type) {
            this.graphType.selected = new_type;
            this.showDatePicker = false;
            this.graphPeriod.selected = 0;

        },
        changePeriod(new_period) {
            if (new_period !== null && !this.dangerAlert) {
                this.graphPeriod.selected = new_period;
                if (new_period === -1) {
                    this.showDatePicker = true;
                    return;
                }
                this.date_custom = {
                    from: null,
                    until: null
                }
                this.showDatePicker = false;
                this.getData();
            }
        },
        getData() {
            let meter = this.metersFilter.selected.split(" ");
            let meter_id = meter[0];
            let meter_device = (meter[1] === "EDS")? "":meter[1];
            meters.getNetCodeReadings(meter_id, meter_device, this.graphPeriod.selected, this.graphType.options[this.graphType.selected].variables , this.date_custom)
                .then(res => {
                    if (res) {
                        console.log(res);
                    }
                });
        }
    }
}
</script>