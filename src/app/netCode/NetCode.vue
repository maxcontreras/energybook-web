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
                    <b-card class="margin-bottom-1">
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
                            <div class="chart-container">
                                <v-series
                                    ref="seriesChart"
                                    v-if="!dangerAlert">
                                </v-series>
                            </div>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>
<script>
/* eslint-disable */
import designatedMeters from '@/services/designatedMeters';
import datePicker from 'vue-bootstrap-datetimepicker';
import VSeries from '@/app/components/chart/VSeries';
import meters from '@/services/meters';
import { parseDate, parseDateTime, parseDayName } from '@/utils/dateTime';

export default {

    components: {
        datePicker,
        VSeries
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
                    {value: 2, text: 'Esta Semana'}
                ]
            },
            graphType: {
                selected: 0,
                options: [
                    { variables: ['Vab', 'Vbc', 'Vca'], name: 'Voltaje' },
                    { variables: ['Ia', 'Ib', 'Ic'], name: 'Amperaje' },
                    { variables: ['THDIa', 'THDIb', 'THDIc'], name: 'THD' },
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
        },
        currentChart() {
            return this.$refs.seriesChart;
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
            if (this.currentChart.isLoading) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    title: 'Petición en proceso',
                    text: 'Por favor, espera mientras los datos de la gráfica se cargan'
                });
            } else if (new_type !== null && !this.dangerAlert) {
                this.graphType.selected = new_type;
                // Reset date picker values
                this.date_custom = {
                    from: null,
                    until: null
                }
                this.showDatePicker = false;
                this.graphPeriod.selected = 0;
                this.currentChart.renderChartWithData()
                    .then(() => {
                        this.getData();
                    })
                    .catch(() => {
                        console.log("Could not load new data");
                    });
            }
        },
        changePeriod(new_period) {
            if (this.currentChart.isLoading) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    title: 'Petición en proceso',
                    text: 'Por favor, espera mientras los datos de la gráfica se cargan'
                });
            } else if (new_period !== null && !this.dangerAlert) {
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
                this.currentChart.renderChartWithData()
                    .then(() => {
                        this.getData();
                    })
                    .catch(() => {
                        console.log("Could not load new data");
                    });
            }
        },
        getData() {
            let meter = this.metersFilter.selected.split(" ");
            let meter_id = meter[0];
            let meter_device = (meter[1] === "EDS")? "":meter[1];
            meters.getNetCodeReadings(meter_id, meter_device, this.graphPeriod.selected, this.graphType.options[this.graphType.selected].variables , this.date_custom)
                .then(res => {
                    if (res) {
                        let { xAxis, tickInterval, data } = this.parseMeterValues(res);
                        const update_data = {
                            xAxis: { categories: xAxis, tickInterval, tickmarkPlacement: "on" }
                        };
                        this.currentChart.updateChart(update_data);
                        let seriesData = [];
                        for (const key in data) {
                            seriesData.push({
                                name: key,
                                data: data[key]
                            });
                        }
                        this.currentChart.updateSeries(seriesData);
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.dangerAlert = true;
                    this.currentChart.load();
                });
        },
        parseMeterValues(values) {
            let dates = [];
            let datesFull = false;
            let data = {};
            for (let key in values) {
                data[key] = values[key].map(reading => {
                    if (!datesFull) {
                        dates.push(reading.date);
                    }
                    return parseFloat(reading.value);
                });
                datesFull = true;
            }
            let { xAxis, tickInterval } = this.parseXAxis(dates);
            return { data, xAxis, tickInterval };
        },
        parseXAxis(dates) {
            let tickInterval = 1;
            const xAxis = dates.map(date => {
                let time = parseDateTime(date);
                const day = parseDayName(date);
                if (this.graphPeriod.selected < 2) {
                    time = time.slice(0, 5);
                    // tickInterval = parseInt(3600/this.currentInterval);
                    return `${time}`;
                } else if (this.graphPeriod.selected == 2) {
                    time = time.slice(0, 5);
                    if (time === '00:00') {
                        time = '';
                    }
                    // tickInterval = parseInt(3600/this.currentInterval * 24);
                    tickInterval = 86000;
                    return `${day} ${date.substring(0, 2)} ${time}`;
                }
            });
            return {xAxis, tickInterval};
        }
    }
}
</script>