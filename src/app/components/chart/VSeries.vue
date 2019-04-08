<template>
    <vue-highcharts
        :options="lineOptions"
        ref="lineCharts">
    </vue-highcharts >
</template>

<script>
import VueHighcharts from 'vue2-highcharts';

const dataLine = {
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

export default {

    components: {
        VueHighcharts
    },

    data() {
        return {
            lineOptions: dataLine,
            plots: [],
            isLoading: false
        }
    },

    methods: {

        showLoading() {
            this.isLoading = true;
            let lineCharts = this.$refs.lineCharts;
            lineCharts.delegateMethod('showLoading', 'Loading...');
        },

        load() {
            let lineCharts = this.$refs.lineCharts;
            for (const plot of this.plots) {
                lineCharts.addSeries(plot);
            }
            lineCharts.hideLoading();
            this.isLoading = false;
        },

        renderChartWithData() {
            return new Promise((accept, deny) => {
                let chart = this.$refs.lineCharts.getChart();
                let lineCharts = this.$refs.lineCharts;

                if (!chart.renderer.forExport) {
                    this.showLoading();
                    lineCharts.removeSeries();
                    accept();
                } else {
                    deny();
                }
            });
        },

        updateSeries(data) {
            this.plots = [];
            for (const plot of data) {
                this.plots.push({
                    data: plot.data,
                    name: plot.name,
                    color: plot.color,
                    zoneAxis: 'x',
                    zones: plot.zones
                });
            }
            this.load();
        },

        updateChart(data) {
            let chart = this.$refs.lineCharts.getChart();
            chart.update(data);
        }
    }
    
}
</script>
