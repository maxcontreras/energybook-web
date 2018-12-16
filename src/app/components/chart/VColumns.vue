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

var dataColumn = {
    chart: {
        type: 'column'
    },
    title: {
        text: null
    },
    xAxis: {
        categories: ['Jan', 'Feb']
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
        series: {
            colorByPoint: true
        }
    },
    series: [{
        data: [{name: "hola", y: 20, color: "#ff4563"}, {name: "mundo", y: 60, color: "#ff4ab3"}]
    }]
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
            dangerAlert: false
        }
    },

    watch: {
        meterId() {
            console.log("WUJU")
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
                    console.log(res);
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
