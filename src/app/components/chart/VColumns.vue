<template>
    <div id="graph-costs" >
        <div class="date-buttons--container container-fluid">
            <b-row>
                <b-col
                    v-show="currentPeriod > 1"
                    md="3"
                    class="text-left">
                    <b-button
                        v-for="(interval, index) in meditionIntervals"
                        :key="index"
                        :class="{
                            'btn-success': index === currentMeditionInterval,
                            'btn-outline-success': index !== currentMeditionInterval
                            }"
                        @click="changeInterval(index)">
                        {{ interval }}
                    </b-button>
                </b-col>
                <b-col
                    :md="(currentPeriod > 1)? 9:12"
                    class="text-right">
                    <b-button
                        v-for="(button, index) in buttons.options"
                        :key="index"
                        :class="{
                            'btn-success': currentPeriod === button.value,
                            'btn-outline-success':currentPeriod !== button.value
                            }"
                        @click="changePeriod(button.value)"
                        :disabled="button.value === 4">
                        {{ button.text }}
                    </b-button>
                </b-col>
            </b-row>
        </div>
        <div class="chart-container">
            <vue-highcharts
                v-if="!dangerAlert"
                :options="ColumnOptions"
                ref="columnCharts">
            </vue-highcharts >
            <b-row
                class="text-center"
                v-if="!dangerAlert">
                <b-col class="column-legends">
                    <ul>
                    <li
                        v-for="(rate, index) in rate_types"
                        :key=index
                        class="legend">
                        <div class="square" :style="{backgroundColor: colors[index]}"></div>
                        <p class="legend-text">{{rate}}</p>
                    </li>
                    </ul>
                </b-col>
            </b-row>
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
import meters from '@/services/meters';
import { parseDate, parseDateTime, parseDayName } from '@/utils/dateTime';

const colors = {'base': '#eddc49', 'middle': '#1dd6c0', 'peak': '#db3c1c', 'diario': '#f48c42'};

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
        pointFormat: '<span style="color:{point.color}">\u25CF</span> Costo: <b>${point.y}</b><br/>',
        valueSuffix: ' MXN'
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
    }]
};

export default {
    components: {
        VueHighcharts
    },

    props: {
        meterId: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            ColumnOptions: dataColumn,
            plot: {
                name: '',
                data: []
            },
            buttons: {
                selected: 0,
                options: [
                    {value: 0, text: 'Hoy'},
                    {value: 1, text: 'Ayer'},
                    {value: 2, text: 'Esta Semana'},
                    {value: 3, text: 'Este Mes'}
                ]
            },
            currentPeriod: 0,
            dangerAlert: false,
            rate_types: [
                'Base',
                'Intermedia',
                'Punta'
            ],
            colors: [
                '#eddc49',
                '#1dd6c0',
                '#db3c1c'
            ],
            meditionIntervals: [
                'Cada hora',
                'Cada día'
            ],
            currentMeditionInterval: 0
        }
    },

    watch: {
        meterId() {
            this.changeMeter();
        }
    },

    beforeMount() {
        this.plot.name = "Costos";
    },

    methods: {
        showLoading() {
            let columnCharts = this.$refs.columnCharts;
            columnCharts.delegateMethod('showLoading', 'Loading...');
        },

        load() {
            let columnCharts = this.$refs.columnCharts;
            columnCharts.addSeries(this.plot);
            columnCharts.hideLoading();
        },

        changeMeter() {
            if (this.dangerAlert) this.dangerAlert = false;
            setTimeout(() => {
                this.changePeriod(0);
            }, 100);
        },

        changeInterval(interval) {
            if (interval !== null && !this.dangerAlert) {
                this.currentMeditionInterval = interval;

                let chart = this.$refs.columnCharts.getChart()
                let columnCharts = this.$refs.columnCharts

                if (!chart.renderer.forExport) {
                    this.showLoading();
                    columnCharts.removeSeries();
                    if (this.currentPeriod < 2) {
                        this.getData(this.currentPeriod, 0, chart);
                    } else {
                        this.getData(this.currentPeriod, interval, chart);
                    }
                }
            }
        },

        changePeriod(period) {
            if (period !== null && !this.dangerAlert) {
                this.currentPeriod = period

                let chart = this.$refs.columnCharts.getChart()
                let columnCharts = this.$refs.columnCharts

                if (!chart.renderer.forExport) {
                    this.showLoading();
                    columnCharts.removeSeries();
                    if (this.currentPeriod < 2) {
                        this.getData(period, 0, chart);
                    } else {
                        this.getData(period, this.currentMeditionInterval, chart);
                    }
                }
            }
        },

        getData(filter, interval, chart) {
            const meter = this.meterId.split(" ");
            let meter_id = meter[0];
            let meter_device = (meter[1] === "EDS")? "":meter[1];
            meters.getConsumptionCostsByFilter(meter_id, meter_device, filter, interval)
                .then(res => {
                    if (res) {
                        let data = [];
                        let tickInterval;
                        let xAxis = res.map(item => {
                            let time = parseDateTime(item.date);
                            data.push(this.formatData(item.date, item.cost, item.rate));
                            let result = this.formatxAxis(item.date);
                            tickInterval = result.tickInterval;
                            return result.res;
                        });
                        let plotOptions = {}
                        if (this.currentPeriod > 1 && res.length >= 20) {
                            plotOptions = {
                                series: {
                                    pointPadding: 0,
                                    groupPadding: 0
                                }
                            }
                        } else {
                            plotOptions = {
                                series: {
                                    pointPadding: .05,
                                    groupPadding: .05
                                }
                            }
                        }
                        chart.update({
                            xAxis: { categories: xAxis, tickInterval },
                            plotOptions: plotOptions
                        });
                        this.updateSeries(data);
                    }
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

        formatxAxis(date) {
            let time = parseDateTime(date);
            let day = parseDayName(date);
            let tickInterval = 1;
            if (this.currentMeditionInterval === 1 && this.currentPeriod > 1) {
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
            }
        },

        formatData(date, cost, rate) {
            let time = parseDateTime(date);
            let day = parseDayName(date);
            let dat = parseDate(date);
            if (this.currentMeditionInterval === 1 && this.currentPeriod === 2) {
                return {name: `${rate} - ${day} ${date.substring(0, 2)}`, y: parseFloat(cost), color: colors[rate]};
            } else if (this.currentMeditionInterval === 1 && this.currentPeriod === 3) {
                return {name: `${rate} - ${dat}`, y: parseFloat(cost), color: colors[rate]};
            }
            if (this.currentPeriod === 2) {
                return {name: `${rate} - ${day} ${time}`, y: parseFloat(cost), color: colors[rate]};
            }
            else if (this.currentPeriod === 3) {
                return {name: `${rate} - ${dat} ${time}`, y: parseFloat(cost), color: colors[rate]};
            }
            else {
                return {name: `${rate} - ${time}`, y: parseFloat(cost), color: colors[rate]};
            }
        }
    }


}
</script>
