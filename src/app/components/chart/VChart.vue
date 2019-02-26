<template>
    <div class="graphs" >
        <div class="date-buttons--container container-fluid">
            <b-row>
                <b-col md="3" class="text-left">
                    <b-button
                        v-for="(type, index) in graphType"
                        :key="index + 1"
                        :class="{
                            'btn-success': currentType.name === type.name,
                            'btn-outline-success': currentType.name !== type.name
                            }"
                        @click="changeType(type)"
                        >
                        {{ type.name }}
                    </b-button>
                </b-col>
                <b-col md="9" class="text-right">
                    <div
                        class="datepickers"
                        v-if="showDatePicker">
                        <date-picker
                            placeholder="Desde"
                            v-model="date_custom.from"
                            @dp-change="setFromDate"
                            :config="dateConfig">
                        </date-picker>
                        <date-picker
                            class="mr-0"
                            placeholder="Hasta"
                            v-model="date_custom.until"
                            @dp-change="setUntilDate"
                            :config="dateConfig">
                        </date-picker>
                    </div>
                    <b-button
                        v-for="(button, index) in buttons.options"
                        :key="index"
                        :class="{
                            'btn-success': currentPeriod === button.value,
                            'btn-outline-success':currentPeriod !== button.value
                            }"
                        @click="changePeriod(button.value)">
                        {{ button.text }}
                    </b-button>
                </b-col>
            </b-row>
        </div>
        <div class="chart-container">
            <div v-if="!dangerAlert">
                <vue-highcharts
                    :options="LineOptions"
                    ref="lineCharts">
                </vue-highcharts >
                <div
                    class="interval-buttons text-right"
                    v-if="currentType.name === 'Consumo' && currentPeriod < 4">
                    <b-button
                        v-for="interval in allowedIntervals"
                        :key="interval.value"
                        :class="{
                            'btn-success': currentInterval === interval.value,
                            'btn-outline-success':currentInterval !== interval.value
                            }"
                        @click="changeInterval(interval.value)">
                        {{ interval.text }}
                    </b-button>
                </div>
            </div>
            <b-alert
                v-else
                show
                class="margin-top-1"
                variant="danger">
                Hubo un error al obtener los datos del medidor. ¡Refresca la página e intenta de nuevo!
            </b-alert>
        </div>
    </div>
</template>

<script>
import VueHighcharts from 'vue2-highcharts';
import datePicker from 'vue-bootstrap-datetimepicker';
import meters from '@/services/meters';
import { parseDate, parseDateTime, parseDayName } from '@/utils/dateTime';

const todayLabels = ['0 hrs','1 hrs', '2 hrs', '3 hrs', '4 hrs', '5 hrs', '6 hrs', '7 hrs', '8 hrs', '9 hrs', '10 hrs', '11 hrs', '12 hrs', '13 hrs', '14 hrs', '15 hrs', '16 hrs', '17 hrs', '18 hrs', '19 hrs', '20 hrs', '21 hrs', '22 hrs', '23 hrs']
const weekLabels = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

var dataLine = {
    chart: {
        type: 'spline'
    },
    title: {
        text: null
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        title: {
            text: null
        }
    },
    tooltip: {
        crosshairs: true,
        shared: true
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        spline: {
            marker: {
                enabled: false
            }
        }
    },
    series: []
}

function mapReadings(arr, parse, xAxis) {
    let data = []
    let val
    arr.forEach(obj => {
        val = parseFloat(obj.value)
        if(parse) {
            xAxis.push(parseDate(obj.date))
        }
        data.push(val)
    })
    return data
}

export default {
    components: {
        VueHighcharts,
        datePicker
    },

    props: {
        meterId: {
            type: String,
            required: true
        },
        defaultVariable: {
            type: String,
            required: false
        },
        defaultName: {
            type: String,
            required: false
        },
        graphType: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },

    data() {
        return {
            date_custom: {
                from: null,
                until: null
            },
            dateConfig: {
                format: 'YYYY-MM-DD',
                useCurrent: false
            },
            showDatePicker: false,
            LineOptions: dataLine,
            plot: {
                name: '',
                color: '#2f7ed8',
                data: [],
                zoneAxis: 'x',
                zones: []
            },
            buttons: {
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
            intervals: [
                {text: '1 hora', value: 3600},
                {text: '30 minutos', value: 1800},
                {text: '15 minutos', value: 900}
            ],
            currentInterval: 3600,
            currentPeriod: 0,
            currentType: {
                variable: '',
                name: ''
            },
            dangerAlert: false,
            isLoading: false
        }
    },

    computed: {
        allowedIntervals() {
            return this.intervals.filter(interval => interval.value !== 300 || this.currentPeriod !== 3)
        },

        dayDifference() {
            if (this.date_custom.until && this.date_custom.from) {
                return moment(this.date_custom.until).diff(moment(this.date_custom.from), 'days');
            }
            return 0;
        }
    },

    watch: {
        meterId() {
            this.changeMeter();
        }
    },

    beforeMount() {
        this.plot.name = this.defaultName;
        if (this.graphType.length > 0) {
            this.currentType = this.graphType[0];
            this.plot.name = this.currentType.name;
        } else {
            this.currentType.variable = this.defaultVariable;
            this.currentType.name = this.defaultName;
        }
    },

    methods: {
        showLoading() {
            this.isLoading = true;
            let lineCharts = this.$refs.lineCharts
            lineCharts.delegateMethod('showLoading', 'Loading...')
        },

        load() {
            let lineCharts = this.$refs.lineCharts;
            lineCharts.addSeries(this.plot);
            lineCharts.hideLoading()
            this.isLoading = false;
        },

        validateDates() {
            if (moment(this.date_custom.until).isBefore(this.date_custom.from)) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    title: 'Fecha incorrecta',
                    text: 'La fecha de inicio no puede ser mayor a la final'
                });
                return false;
            } else if (this.dayDifference > 31) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    title: 'Periodo muy grande',
                    text: 'El periodo no puede exceder más de 31 días'
                });
                return false;
            }
            return true;
        },

        setFromDate() {
            if (this.date_custom.until && this.date_custom.from && !this.isLoading) {
                if(this.validateDates()) {
                    this.renderChartWithData();
                }
            }
        },

        setUntilDate() {
            if (this.date_custom.from && this.date_custom.until && !this.isLoading) {
                if(this.validateDates()) {
                    this.renderChartWithData();
                }
            }
        },

        renderChartWithData() {
            let chart = this.$refs.lineCharts.getChart();
            let lineCharts = this.$refs.lineCharts;

            if (!chart.renderer.forExport) {
                this.showLoading();
                lineCharts.removeSeries();
                this.getData(this.currentPeriod, this.currentType.variable, this.meterId, chart, this.currentInterval, this.date_custom);
            }
        },

        changeMeter() {
            this.showDatePicker = false;
            if (this.dangerAlert) this.dangerAlert = false;
            setTimeout(() => {
                this.changePeriod(0);
            }, 100);
        },

        changeInterval(interval) {
            if (this.isLoading) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    title: 'Petición en proceso',
                    text: 'Por favor, espera mientras los datos de la gráfica se cargan'
                });
                return;
            }
            if (interval !== null && !this.dangerAlert) {
                this.currentInterval = interval;

                let chart = this.$refs.lineCharts.getChart();
                let lineCharts = this.$refs.lineCharts;

                if (!chart.renderer.forExport) {
                    this.showLoading();
                    lineCharts.removeSeries();
                    this.getData(this.currentPeriod, this.currentType.variable, this.meterId, chart, interval, this.date_custom);
                }
            }
        },

        changeType(type) {
            if (this.isLoading) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    title: 'Petición en proceso',
                    text: 'Por favor, espera mientras los datos de la gráfica se cargan'
                });
                return;
            }
            if (type !== null && !this.dangerAlert) {
                this.currentType = type;
                if (this.currentPeriod === -1) {
                    this.showDatePicker = false;
                    this.currentPeriod = 0;
                }
                this.plot.name = type.name;
                let chart = this.$refs.lineCharts.getChart();
                let lineCharts = this.$refs.lineCharts;

                if (!chart.renderer.forExport) {
                    this.showLoading()
                    lineCharts.removeSeries()
                    this.getData(this.currentPeriod, type.variable, this.meterId, chart, this.currentInterval, this.date_custom)
                }
            }
        },

        changePeriod(period) {
            if (this.isLoading) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    title: 'Petición en proceso',
                    text: 'Por favor, espera mientras los datos de la gráfica se cargan'
                });
                return;
            }
            if (period !== null && !this.dangerAlert) {
                this.currentPeriod = period;

                if (period === 3) {
                    this.currentInterval = 3600;
                } else if (period === -1) {
                    this.showDatePicker = true;
                    return;
                }
                this.date_custom = {
                    from: null,
                    until: null
                }
                this.showDatePicker = false;
                let chart = this.$refs.lineCharts.getChart();
                let lineCharts = this.$refs.lineCharts;

                if (!chart.renderer.forExport) {
                    this.showLoading();
                    lineCharts.removeSeries();
                    this.getData(period, this.currentType.variable, this.meterId, chart, this.currentInterval);
                }
            }
        },

        getData(filter, type, meter, chart, interval, custom_dates = {}) {
            // TODO: Receive meter id, filter and device name & send it to the API
            meter = meter.split("*");
            let meter_id = meter[0];
            let meter_device = (meter[1] === "EDS")? '':meter[1];
            let service = (meter[1] === "EDS")? meter[2]: '';
            if (type === "epimp") {
                if (this.currentPeriod > 3) {
                    interval = -1;
                }
                meters.getEpimpReadingsByFilter(meter_id, meter_device, service, filter, interval, custom_dates).then(res => {
                    if(res){
                        let xAxis = [];
                        let parse = false;
                        let tickInterval = 1;
                        let tickmarkPlacement = "on";
                        const result = this.getxAxis(res);
                        xAxis = result.xAxis;
                        tickInterval = result.tickInterval;

                        let data = mapReadings(res, false, xAxis);
                        // TODO: See why the fuck the marker does not appear on an epimp graph
                        chart.update({
                            xAxis: { categories: xAxis, tickInterval, tickmarkPlacement }
                        })
                        this.updateSeries(data);
                    }
                }).catch(error => {
                    console.log(error);
                    this.dangerAlert = true;
                    this.load()
                });
            } else if (type === "dp") {
                meters.getDpReadingsByFilter(meter_id, meter_device, service, filter, custom_dates).then(res => {
                    if(res){
                        let xAxis = [];
                        let parse = false;
                        let tickInterval = 1;
                        let tickmarkPlacement = "on";
                        let zones = [];
                        const result = this.getDpAxis(res);
                        xAxis = result.xAxis;
                        zones = result.zones;
                        if (this.currentPeriod < 2) {
                            if (this.currentPeriod === -1 && this.dayDifference > 4) {
                                tickInterval = 24*4;
                            } else {
                                tickInterval = 4;
                            }
                        }
                        else if (this.currentPeriod === 2) {
                            tickInterval = 24;
                        }
                        else if (this.currentPeriod === 3) {
                            tickInterval = 96;
                            tickmarkPlacement = "between";
                        } else {
                            parse = true;
                            xAxis = [];
                        }
                        let data = mapReadings(res, parse, xAxis);
                        chart.update({
                            xAxis: { categories: xAxis, tickInterval, tickmarkPlacement }
                        })
                        this.updateSeries(data, zones);
                    }
                }).catch(error => {
                    console.log(error);
                    this.dangerAlert = true;
                    this.load()
                });
            }
        },

        updateSeries(data, zones = []) {
            this.plot.data = data;
            this.plot.zones = zones;
            this.load();
        },

        getDpAxis(values) {
            const zones = [];
            let currVal = 0;
            let isPeak = false;
            const xAxis = values.map(item => {
                // Format zones
                if (item.isPeak !== isPeak) {
                    zones.push({
                        value: currVal,
                        color: (item.isPeak) ? '#2f7ed8' : '#ce1616'
                    });
                }
                currVal++;
                isPeak = item.isPeak;
                if (this.currentPeriod === -1) {
                    let time = parseDateTime(item.date);
                    const date = parseDayName(item.date);
                    time = time.slice(0, 5);
                    if (time === '00:00') {
                        time = '';
                    }
                    return `${date} ${item.date.substring(0, 2)} ${time}`;
                }
                if (this.currentPeriod === 2) {
                    return `${parseDayName(item.date)} ${parseDateTime(item.date).slice(0, 5)}`;
                }
                if (this.currentPeriod === 3) {
                    let time = parseDateTime(item.date);
                    const date = parseDayName(item.date);
                    time = time.slice(0, 5);
                    if (time === '00:00') {
                        time = '';
                    }
                    return `${date} ${item.date.substring(0, 2)} ${time}`;
                }
                return parseDateTime(item.date).slice(0, 5);
            });
            zones.push({
                value: --currVal,
                color: (isPeak) ? '#ce1616' : '#2f7ed8'
            });
            return {xAxis, zones};
        },

        getxAxis(values) {
            let tickInterval = 1;
            if (this.currentPeriod === -1) {
                const xAxis = values.map(item => {
                    let time = parseDateTime(item.date);
                    const date = parseDayName(item.date);
                    time = time.slice(0, 5);
                    if (time === '00:00') {
                        time = '';
                    }
                    return `${date} ${item.date.substring(0, 2)} ${time}`;
                });
                if (this.dayDifference > 1) {
                    tickInterval = parseInt(3600/this.currentInterval * 24);
                } else {
                    tickInterval = parseInt(3600/this.currentInterval * 2);
                }
                return {xAxis, tickInterval};
            }else if (this.currentPeriod < 2) {
                if (this.currentInterval === 3600) {
                    return {xAxis: todayLabels, tickInterval};
                }
                const xAxis = values.map(item => {
                    let time = parseDateTime(item.date);
                    time = time.slice(0, 5);
                    return `${time}`;
                });
                tickInterval = parseInt(3600/this.currentInterval);
                return {xAxis, tickInterval};
            }
            else if (this.currentPeriod < 4) {
                const xAxis = values.map(item => {
                    let time = parseDateTime(item.date);
                    const date = parseDayName(item.date);
                    time = time.slice(0, 5);
                    if (time === '00:00') {
                        time = '';
                    }
                    return `${date} ${item.date.substring(0, 2)} ${time}`;
                });
                tickInterval = parseInt(3600/this.currentInterval * 24);
                return {xAxis, tickInterval}
            }
            if (this.currentPeriod === 4) return {xAxis: values.map(item => parseDate(item.date)), tickInterval};
            return {xAxis: weekLabels, tickInterval};
        }
    }
}
</script>
