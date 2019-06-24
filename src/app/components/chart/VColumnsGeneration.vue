<template>
    <div id="graph-generation">
        <div class="date-buttons--container container-fluid">
            <b-row>
                <b-col 
                    xl="5"
                    class="text-left">
                    <b-button
                        v-for="(type, index) in graphType.options"
                        :key="index + 1"
                        :class="{
                            'btn-success': graphType.selected === index,
                            'btn-outline-success': graphType.selected !== index
                            }"
                        @click="changeDisplayedVariable(index)"
                        >
                        {{ type.name }}
                    </b-button>
                </b-col>
                <b-col
                    xl="7"
                    class="text-right">
                    <b-button
                        v-for="(button, index) in buttons.options"
                        :key="index"
                        :class="{
                            'btn-success': currentPeriod === button.value,
                            'btn-outline-success':currentPeriod !== button.value
                            }"
                        @click="changePeriod(button.value)"
                        >
                        {{ button.text }}
                    </b-button>
                </b-col>
            </b-row>
                <div
                    class="datepickers"
                    v-if="showDatePicker">
                    <date-picker
                        placeholder="Desde"
                        v-model="date_custom.from"
                        @dp-change="setCustomDate"
                        :config="dateConfig"
                        style="width:40%">
                    </date-picker>
                    <date-picker
                        class="mr-0"
                        placeholder="Hasta"
                        v-model="date_custom.until"
                        @dp-change="setCustomDate"
                        :config="dateConfig"
                        style="width:40%">
                    </date-picker>
                </div>
        </div>
        <div class="chart-container" ref="chart">
            <vue-highcharts
                v-if="!dangerAlert"
                :options="ColumnOptions"
                ref="columnCharts">
            </vue-highcharts >
            <b-alert
                v-else
                show
                class="margin-top-1"
                variant="danger">
                Hubo un error al obtener los datos del medidor. ¡Refresca la página e intenta de nuevo!
            </b-alert>
        </div>
        <div class="date-buttons--container container-fluid" v-show="showMeditionIntervals">
            <b-row>
                <b-col
                class="text-right">
                    <b-button 
                    v-for="(medition, index) in meditionIntervals"
                    :key="index"
                    :class="{
                        'btn-success': currentMeditionInterval === index,
                        'btn-outline-success':currentMeditionInterval !== index
                    }"
                    @click="changeCurrentMeditionInterval(index)"
                    >
                        {{medition}}
                    </b-button>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import VueHighcharts from 'vue2-highcharts';
import meters from '@/services/meters';
import datePicker from 'vue-bootstrap-datetimepicker';
import { parseDate, parseDateTime, parseDayName, parseMonth } from '@/utils/dateTime';

var dataColumn = {
    chart: {
        type: 'column'
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
        shared: true,
        pointFormat: '<span style="color:{point.color}">\u25CF</span> Autoconsumo: <b>${point.y}</b><br/>',
        valueSuffix: ' kWh'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        column: {
            groupPadding: 0
        },
        series: {
            colorByPoint: true,
            pointPadding: 0,
            groupPadding: 0
        }
    },
    series: [{
        data: []
    }],
    meditionIntervals: [
        'Cada hora',
        'Cada día'
    ],
};

export default {
    components: {
        VueHighcharts,
        datePicker
    },

    props: {
        meterId: {
            type: String,
            required: true
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
            ColumnOptions: dataColumn,
            plot: {
                name: '',
                data: []
            },
            buttons: {
                selected: 0,
                options: [
                    {value: -1, text: 'Calendario'},
                    {value: 0, text: 'Hoy'},
                    {value: 1, text: 'Ayer'},
                    {value: 2, text: 'Esta Semana'},
                    {value: 3, text: 'Este Mes'},
                    {value: 4, text: 'Este Año'}
                ]
            },
            currentPeriod: 0,
            dangerAlert: false,
            colors: {
                'base': '#eddc49',
            },
            meditionIntervals: [
                'Cada hora',
                'Cada día'
            ],
            currentMeditionInterval: 0,
            isLoading: false,
            graphType: {
                selected: 0,
                options: [
                    { name: 'Generación'},
                    { name: 'Autoconsumo'},
                    { name: 'Inyección a la red' }
                ]
            }
        }
    },
    watch: {
        meterId() {
            this.changeMeter();
        }
    },
    computed: {
        rate_types() {
            if (this.currentMeditionInterval === 1 && this.currentPeriod > 1) {
                return [ 'Diario' ]
            } else {
                return [
                    'Base',
                    'Intermedia',
                    'Punta'
                ]
            }
        },
        currentChart() {
            return this.$refs.chart;
        },
        dayDifference() {
            if (this.date_custom.until && this.date_custom.from) {
                return moment(this.date_custom.until).diff(moment(this.date_custom.from), 'days');
            }
            return 0;
        },
        showMeditionIntervals() {
            return (this.currentPeriod > 1 && this.currentPeriod < 4) || this.currentPeriod === -1 
        }
    },
    beforeMount() {
        this.plot.name = this.graphType.options[this.graphType.selected].name;
    },

    methods: {
        changeCurrentMeditionInterval(new_medition) {
            this.currentMeditionInterval = new_medition;
            this.renderChartWithData();
        },
        changeDisplayedVariable(new_type) {
            if (this.isLoading) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    title: 'Petición en proceso',
                    text: 'Por favor, espera mientras los datos de la gráfica se cargan'
                });
                return;
            } else if (new_type !== null && !this.dangerAlert) {
                this.graphType.selected = new_type;
                // Reset date picker values
                this.date_custom = {
                    from: null,
                    until: null
                }
                this.showDatePicker = false;
                this.plot.name = this.graphType.options[this.graphType.selected].name;
                this.renderChartWithData();
            }
        },
        showLoading() {
            this.isLoading = true;
            let columnCharts = this.$refs.columnCharts;
            columnCharts.delegateMethod('showLoading', 'Loading...');
        },

        load() {
            let columnCharts = this.$refs.columnCharts;
            columnCharts.addSeries(this.plot);
            columnCharts.hideLoading();
            this.isLoading = false;
        },

        changeMeter() {
            if (this.dangerAlert) this.dangerAlert = false;
            setTimeout(() => {
                this.changePeriod(0);
            }, 100);
        },

        validateDates() {
            let isValid = false;
            let errorMessage = {};
            if (moment(this.date_custom.until).isBefore(this.date_custom.from)) {
                errorMessage = { title: 'Fecha incorrecta', text: 'La fecha de inicio no puede ser mayor a la final' };
            } else if (this.dayDifference > 31) {
                errorMessage = { title: 'Periodo muy grande', text: 'El periodo no puede exceder más de 31 días' };
            } else if (moment().isBefore(this.date_custom.from)){
                errorMessage = { title: 'Periodo inexistente', text: 'La fecha de inicio no puede ser mayor a la actual' };
            } else {
                isValid = true;
            }
            return {isValid, errorMessage};
        },

        setCustomDate() {
            if (this.date_custom.from && this.date_custom.until && !this.isLoading) {
                const {isValid, errorMessage} = this.validateDates();
                if(isValid) {
                    this.renderChartWithData();
                } else {
                    this.$notify({
                        group: 'notification',
                        type: 'warn',
                        title: errorMessage.title,
                        text: errorMessage.text
                    });
                }
            }
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
                this.currentMeditionInterval = interval;

                this.renderChartWithData();
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
                this.currentPeriod = period

                if (period === -1) {
                    this.showDatePicker = true;
                    return;
                }
                this.date_custom = {
                    from: null,
                    until: null
                }
                this.showDatePicker = false;

                this.renderChartWithData();
            }
        },

        renderChartWithData() {
            let chart = this.$refs.columnCharts.getChart();
            let columnCharts = this.$refs.columnCharts;
            if (!chart.renderer.forExport) {
                this.showLoading();
                columnCharts.removeSeries();
                if (this.currentPeriod !== -1 && this.currentPeriod < 2) {
                    this.getData(this.currentPeriod, 0, chart);
                } else if (this.currentPeriod === 4) {
                    this.getData(this.currentPeriod, 2, chart);
                } else {
                    this.getData(this.currentPeriod, this.currentMeditionInterval, chart);
                }
            }
        },

        getData(filter, interval, chart) {
            const meter = this.meterId.split("*");
            let meter_id = meter[0];
            let meter_device = (meter[1] === "EDS")? undefined:meter[1];
            let service = (meter[1] === "EDS")? meter[2]: undefined;

            meters.getGenerationReadings(meter_id, meter_device, service, filter, interval, this.graphType.selected, this.date_custom)
            .then(res => {
                //console.log(res);
                let data = [];
                let tickInterval;
                let xAxis = res.map(item => {
                    let time = parseDateTime(item.date);
                    data.push(this.formatData(item.date, parseFloat(item.value)));
                    let result = this.formatxAxis(item.date);
                    tickInterval = result.tickInterval;
                    return result.res;
                });
                let plotOptions = this.formatPlotOptions(this.currentPeriod, res.length);
                let tooltip = this.formatTooltip(this.currentMeditionInterval, this.currentPeriod);
                
                chart.update({
                    xAxis: { categories: xAxis, tickInterval },
                    plotOptions: plotOptions,
                    tooltip
                });
                this.updateSeries(data);
            })
            .catch(err => {
                console.log(err);
                this.dangerAlert = true;
                this.load();
            });
        },

        updateSeries(data) {
            this.plot.data = data;
            this.load()
        },

        formatTooltip(interval, period) {
            return {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> '+this.graphType.options[this.graphType.selected].name+': <b>{point.y}</b><br/>'
            }
        },

        formatPlotOptions(period, numberResults) {
            if (period > 1 && numberResults >= 20) {
                return {
                    series: {
                        pointPadding: 0,
                        groupPadding: 0
                    }
                }
            } else {
                return {
                    series: {
                        pointPadding: .05,
                        groupPadding: .05
                    }
                }
            }
        },

        formatxAxis(date) {
            let time = parseDateTime(date);
            let day = parseDayName(date);
            let month = parseMonth(date);
            let tickInterval = 1;
            if (this.currentMeditionInterval === 1 && (this.currentPeriod > 1 || this.currentPeriod === -1)) {
                return {res: `${day} ${date.substring(0, 2)}`, tickInterval};
            }
            if (this.currentPeriod === -1) {
                tickInterval = 24;
                return {res: `${day} ${date.substring(0, 2)}`, tickInterval};
            }
            if (this.currentPeriod < 2) {
                return {res: time, tickInterval};
            } else if (this.currentPeriod === 2) {
                tickInterval = 6;
                return {res: `${day} ${time}`, tickInterval};
            } else if (this.currentPeriod === 3) {
                tickInterval = 12;
                if (time === '00:00:00') {
                    return {res: `${day} ${date.substring(0, 2)}`, tickInterval};
                } else {
                    return {res: `${time}`, tickInterval};
                }
            } else if (this.currentPeriod === 4) {
                tickInterval = 1;
                return {res: `${month}`, tickInterval};
            }
        },

        formatData(date, value) {
            let time = parseDateTime(date);
            let day = parseDayName(date);
            let dat = parseDate(date);
            let month = parseMonth(date);
            if (this.currentMeditionInterval === 1 && this.currentPeriod === 2) {
                return {name: `${this.graphType.options[this.graphType.selected].name} - ${day} ${date.substring(0, 2)}`, y: parseFloat(value.toFixed(6)), color: this.colors['base']};
            } else if (this.currentMeditionInterval === 1 && this.currentPeriod === 3) {
                return {name: `${this.graphType.options[this.graphType.selected].name} - ${dat}`, y: parseFloat(value.toFixed(6)), color: this.colors['base']};
            }
            if (this.currentPeriod === 2) {
                return {name: `${this.graphType.options[this.graphType.selected].name} - ${day} ${time}`, y: parseFloat(value.toFixed(6)), color: this.colors['base']};
            }
            else if (this.currentPeriod === 3) {
                return {name: `${this.graphType.options[this.graphType.selected].name} - ${dat} ${time}`, y: parseFloat(value.toFixed(6)), color: this.colors['base']};
            }
            else if (this.currentPeriod === 4) {
                return {name: `${this.graphType.options[this.graphType.selected].name} - ${month}`, y: parseFloat(value.toFixed(6)), color: this.colors['base']};    
            }
            else {
                return {name: `${this.graphType.options[this.graphType.selected].name} - ${time}`, y: parseFloat(value.toFixed(6)), color: this.colors['base']};
            }
        }
    }


}
</script>
