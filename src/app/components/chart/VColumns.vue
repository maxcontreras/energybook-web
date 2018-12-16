<template>
    <div id="graph-costs" >
        <div class="date-buttons--container container-fluid">
            <b-row>
                <b-col class="text-right">
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

const weekLabels = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const colors = {'base': '#eddc49', 'middle': '#1dd6c0', 'peak': '#db3c1c'};

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
            colorByPoint: true
        }
    },
    series: [{
        data: []
    }]
};

function parseDate(rawDate) {
    let day, month, year;
    day = rawDate.substring(0, 2);
    month = rawDate.substring(2, 4);
    year = rawDate.substring(4, 8);
    return `${day}/${month}/${year}`;
}

function parseDateTime(rawDate) {
    let hour, minute, second;
    hour = rawDate.substring(8, 10);
    minute = rawDate.substring(10, 12);
    second = rawDate.substring(12, 14);
    return `${hour}:${minute}:${second}`;
}

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
                    {value: 3, text: 'Este Mes'},
                    {value: 4, text: 'Este Año'},
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
            ]
        }
    },

    watch: {
        meterId() {
            this.changePeriod(0);
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

        changePeriod(period) {
            if (period !== null) {
                this.currentPeriod = period

                let chart = this.$refs.columnCharts.getChart()
                let columnCharts = this.$refs.columnCharts

                if (!chart.renderer.forExport) {
                    this.showLoading();
                    columnCharts.removeSeries();
                    this.getData(period, chart);
                }
            }
        },

        getData(filter, chart) {
            const meter = this.meterId.split(" ");
            let meter_id = meter[0];
            let meter_device = (meter[1] === "EDS")? "":meter[1];
            meters.getConsumptionCostsByFilter(meter_id, meter_device, filter)
                .then(res => {
                    if (res) {
                        let data = [];
                        let xAxis = res.map(item => {
                            const time = parseDateTime(item.date);
                            data.push({name: `${item.rate} - ${time}`, y: parseFloat(item.cost), color: colors[item.rate]})
                            return time;
                        });
                        chart.update({
                            xAxis: { categories: xAxis }
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
        }
    }


}
</script>
