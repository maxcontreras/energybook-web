<template>
    <div id="graphs" >
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
                    <b-button
                        v-for="(button, index) in buttons[0].options"
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
            <vue-highcharts
                v-if="!dangerAlert"
                :options="LineOptions"
                ref="lineCharts">
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
import VueHighcharts from 'vue2-highcharts'
import meters from '@/services/meters'

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

// Returns the day name of a date with format 'DDMMYYYYHHMMSSSSS'
function parseDayName(rawDate) {
    let day, month, year;
    day = rawDate.substring(0, 2);
    month = rawDate.substring(2, 4);
    year = rawDate.substring(4, 8);
    return weekLabels[new Date(`${month}/${day}/${year}`).getDay()%7];
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
        VueHighcharts
    },

    props: {
        meterId: {
            type: String,
            required: true
        },
        defaultVariable: {
            type: String,
            required: true
        },
        defaultName: {
            type: String,
            required: true
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
            LineOptions: dataLine,
            plot: {
                name: '',
                data: []
            },
            buttons: [{
                selected: 0,
                options: [
                    {value: 0, text: 'Hoy'},
                    {value: 1, text: 'Ayer'},
                    {value: 2, text: 'Esta Semana'},
                    {value: 3, text: 'Este Mes'},
                    {value: 4, text: 'Este Año'},
                ]
            }],
            currentPeriod: 0,
            currentType: {
                variable: '',
                name: ''
            },
            dangerAlert: false
        }
    },

    watch: {
        meterId() {
            this.changePeriod(0)
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
            let lineCharts = this.$refs.lineCharts
            lineCharts.delegateMethod('showLoading', 'Loading...')
        },

        load() {
            let lineCharts = this.$refs.lineCharts;
            lineCharts.addSeries(this.plot);
            lineCharts.hideLoading()
        },

        changeType(type) {
            if (type !== null) {
                this.currentType = type;
                this.plot.name = type.name;
                let chart = this.$refs.lineCharts.getChart();
                let lineCharts = this.$refs.lineCharts;

                if (!chart.renderer.forExport) {
                    this.showLoading()
                    lineCharts.removeSeries()
                    this.getData(this.currentPeriod, type.variable, this.meterId, chart)
                }
            }
        },

        changePeriod(period) {
            if (period !== null) {
                this.currentPeriod = period

                let chart = this.$refs.lineCharts.getChart()
                let lineCharts = this.$refs.lineCharts

                if (!chart.renderer.forExport) {
                    this.showLoading()
                    lineCharts.removeSeries()
                    this.getData(period, this.currentType.variable, this.meterId, chart)
                }
            }
        },

        getData(filter, type, meter, chart) {
            // TODO: Receive meter id, filter and device name & send it to the API
            meter = meter.split(" ");
            let meter_id = meter[0];
            let meter_device = meter[1];
            if (type === "epimp") {
                meters.getEpimpReadingsByFilter(meter_id, meter_device, filter).then(res => {
                    if(res){
                        let xAxis = [];
                        let parse = false;
                        let tickInterval = 1;
                        let tickmarkPlacement = "on";
                        if (this.currentPeriod < 3) {
                            xAxis = this.getxAxis();
                        } else {
                            parse = true;
                        }
                        let data = mapReadings(res, parse, xAxis);
                        // TODO: See why the fuck the marker does not appear on an epimp graph
                        chart.update({
                            xAxis: { categories: xAxis, tickInterval, tickmarkPlacement }
                        })
                        console.log(chart);
                        this.updateSeries(data);
                    }
                }).catch(error => {
                    console.log(error);
                    this.dangerAlert = true;
                    this.load()
                });
            } else if (type === "dp") {
                meters.getDpReadingsByFilter(meter_id, meter_device, filter).then(res => {
                    if(res){
                        let xAxis = [];
                        let parse = false;
                        let tickInterval = 1;
                        let tickmarkPlacement = "on";
                        if (this.currentPeriod < 2) {
                            xAxis = this.getDpAxis(res);
                        }
                        else if (this.currentPeriod === 2) {
                            tickInterval = 24;
                            xAxis = this.getDpAxis(res);
                        }
                        else if (this.currentPeriod === 3) {
                            tickInterval = 96;
                            tickmarkPlacement = "between";
                            xAxis = this.getDpAxis(res);
                        } else {
                            parse = true;
                        }
                        let data = mapReadings(res, parse, xAxis);
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
            }
        },

        updateSeries(data) {
            this.plot.data = data
            this.load()
        },

        getDpAxis(values) {
            return values.map(item => {
                if (this.currentPeriod === 2) {
                    return `${parseDayName(item.date)} ${parseDateTime(item.date)}`;
                }
                if (this.currentPeriod === 3) {
                    let time = parseDateTime(item.date);
                    const date = parseDayName(item.date);
                    if (time === '00:00:00') {
                        time = '';
                    }
                    return `${date} ${item.date.substring(0, 2)} ${time}`;
                }
                return parseDateTime(item.date);
            });
        },

        getxAxis() {
            if(this.currentPeriod < 2) return todayLabels
            return weekLabels
        }
    }
}
</script>
