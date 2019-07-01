/* eslint-disable */
import designatedMeters from '@/services/designatedMeters'
import VCfeGDMTH from '@/app/components/VCfeGDMTH';
import ReadingCard from '@/app/components/ReadingCard';
import meters from '@/services/meters'
import VTable from '@/app/components/VTable.vue'
import PieChart from '@/app/components/chart/pieChart'
import { gmapApi } from 'vue2-google-maps'
import Weather from 'vue-weather-widget'
import 'vue-weather-widget/dist/css/vue-weather-widget.css'
import VueHighcharts from 'vue2-highcharts'
import VueHighChartsComponent from '@/app/components/chart/VueHighCharts.vue'
import Highcharts from 'highcharts'
import DashboardAdmin from '@/app/dashboard/DashboardAdmin.vue'
import solidGauge from 'highcharts/modules/solid-gauge'
import highchartsMore from 'highcharts/highcharts-more'
import Constants from '@/constants.json';

highchartsMore(Highcharts);
solidGauge(Highcharts)

const monthLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']

Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Poppins'
        }
    }
})

var dataLine = {
    chart: {
      type: 'spline'
    },
    title: {
      text: null
    },
    xAxis: {
      categories: monthLabels
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

var gaugeOptions = {

    chart: {
        type: 'solidgauge'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#AFFC0F'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

var asyncData = {
    name: 'Consumo',
    color: '#2f7ed8',
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
      y: 26.5
    }, 23.3, 18.3, 13.9, 9.6]
}



var position = { lat: '20.663782', lng: '-103.3916394' }
moment.locale('es')
var chartSpeed

function parseHours(rawDate) {
    let hour = rawDate.substring(8, 10)
    return `${hour}:00 hrs`
}

function parseDate(rawDate) {
    let day, month, year
    day = rawDate.substring(0, 2)
    month = rawDate.substring(2, 4)
    year = rawDate.substring(4, 8)
    return `${day}/${month}/${year}`
}

function currencyFormat(num) {
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export default {
    components: {
        VTable,
        Weather,
        PieChart,
        VueHighcharts ,
        VueHighChartsComponent,
        DashboardAdmin,
        VCfeGDMTH,
        ReadingCard
    },

    props: {
        companyIdProp: {
            type: String,
            required: false
        }
    },

    data() {
        return {
            meters: [],
            dpVal: 0,
            epimpVal: 0,
            chartData: {
                datasets: [{
                    data: [],
                    backgroundColor: ['#229954', '#3498DB', '#1ABC9C', '#F1C40F', '#E67E22', '#2980B9', '#E74C3C','#8E44AD','#138D75']
                }],
                labels: []
            },
            chartOptions: {
                legend: {
                    labels: {
                    fontSize: 25
                    }
                },
                tooltips: {
                    bodyFontSize: 25
                }
            },
            lineOptions: dataLine,
            edsId: '',
            refreshingData: false,
            consumptionCost: 0,
            consumptionMonthCost: 0
        }
    },

    computed: {
        isAdmin() {
            return JSON.parse(localStorage.getItem('user')).role_id === 1 && this.$route.name === 'dashboard';
        },

        isCompanyDetail() {
            return this.$route.name === 'companyDetail';
        },

        cfePrices() {
            return this.$store.getters['meter/getCfePrices'];
        },

        epimpHistory() {
            return this.$store.state.socket.epimpHistory;
        },

        distribution() {
            let prettyDist = this.prettifyNumbers(this.$store.state.socket.distribution);
            return prettyDist;
        },

        dailyLastUpdatedTime() {
            return this.$store.state.socket.lastUpdated;
        },

        distributionCost() {
            return (this.cfePrices.distribution * parseFloat(this.distribution)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        distributionCharge() {
            let prettyDistributionCharge = this.prettifyNumbers(this.$store.state.socket.distributionCharge);
            return currencyFormat(parseFloat(prettyDistributionCharge))
        },

        distributionMonth() {
            let prettyDistribution = this.prettifyNumbers(this.$store.state.socket.distributionMonth);
            return parseFloat(prettyDistribution);
        },

        distributionMonthCost() {
            return (this.cfePrices.distribution * parseFloat(this.distributionMonth)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        odometer() {
            return parseFloat(this.$store.state.socket.odometer);
        },

        consumption() {
            let prettyCons = this.prettifyNumbers(this.$store.state.socket.consumption);
            return prettyCons;
        },

        capacity() {
            return this.$store.state.socket.capacity;
        },

        capacityCost() {
            return (this.cfePrices.capacity * parseFloat(this.capacity)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        capacityMonth() {
            return this.$store.state.socket.capacityMonth;
        },

        capacityMonthCost() {
            return (this.cfePrices.capacity * parseFloat(this.capacityMonth)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        consumptionMonth() {
            let prettyConsumption = this.prettifyNumbers(this.$store.state.socket.consumptionMonth);
            return prettyConsumption;
        },

        consumptionSummary() {
            return this.$store.state.socket.consumptionSummary;
        },

        powerFactor() {
            let prettyFP = this.prettifyNumbers(this.$store.state.socket.powerFactor);
            return this.$store.state.socket.powerFactor;
        },

        reactives() {
            return parseInt(this.$store.state.socket.reactive).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        billablePeriod() {
            moment().locale();
            let start = moment().startOf('month').format('LL');
            start = start.slice(0, -8);
            let end = moment().endOf('month').format('LL');
            return `${start} - ${end}`
        },

        currentDay() {
            moment().locale();
            let day = moment().format('dddd D [de] MMMM');
            return day;
        },

        currentFormattedDate() {
            return moment(this.currentDate).format('LLL')
        },

        position() {
            return position
        },

        companyId() {
            if(this.isCompanyDetail) return this.companyIdProp
            return JSON.parse(localStorage.getItem('user')).company_id
        },

        serviceSelected() {
            return this.$store.state.selectedService;
        },

        google: gmapApi
    },

    watch: {
        odometer() {
            this.updateOdometerChart()
        },

        epimpHistory() {
            this.updateEpimpHistoryChart()
        },

        consumptionSummary() {
            this.updatePieChart()
        },

        consumption() {
            this.getConsumptionCost(Constants.Meters.filters.today);
        },

        consumptionMonth() {
            this.getConsumptionCost(Constants.Meters.filters.month);
        },

        serviceSelected() {
            if (!this.isAdmin) {
                this.getMeters();
            }
        }
    },

    beforeMount() {
        if(this.isAdmin) return;
        this.getMeters()
            .then(() => {
                this.getConsumptionCost(Constants.Meters.filters.today)
                    .then(() => {
                        this.getConsumptionCost(Constants.Meters.filters.month);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                
            });
    },

    mounted() {
        if(this.isAdmin) {
            $('.user-dashboard').remove()
            return;
        }

        $('.dashboard-history .highcharts-container').css({'max-width': '1149px', 'width': 'auto'})

        this.load();
        this.updatePieChart();
    },

    methods: {
        getConsumptionCost(period) {
            return new Promise((resolve, reject) => {
                meters.getConsumptionCostsByFilter(this.edsId, '', this.serviceSelected, period, 86400, {})
                .then(res => {
                    let cost = (res.reduce((prev, curr) => {
                        return prev + parseFloat(curr.cost);
                    }, 0)).toFixed(2);
                    if (period === Constants.Meters.filters.today) {
                        this.consumptionCost = cost.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else if (period === Constants.Meters.filters.month) {
                        this.consumptionMonthCost = cost.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                    resolve();
                })
                .catch(() => reject());
            });
        },
        refresh() {
            this.refreshingData = true;

            /* Promise.all([
                designatedMeters.odometerReadings(this.companyId),
                designatedMeters.dailyReadings(this.companyId),
                designatedMeters.fpReadings(this.companyId),
                designatedMeters.monthlyReadings(this.companyId),
                designatedMeters.epimpHistory(this.companyId),
                designatedMeters.consumptionSummary(this.companyId)
            ])
            .then(() => {
                this.getMeters();
                this.load();
                this.refreshingData = false;
            })
            .catch(error => {
                console.log(error);
                this.refreshingData = false;

                this.$notify({
                    group: 'notification',
                    type: 'error',
                    title: 'Error al obtener datos de medidores',
                    text: 'Verifica que tus medidores estén funcionando correctamente '
                });
            }); */
            
            designatedMeters.odometerReadings(this.companyId)
                .finally(() => {
                    return designatedMeters.dailyReadings(this.companyId);
                })
                .finally(() => {
                    return designatedMeters.fpReadings(this.companyId);
                })
                .finally(() => {
                    return designatedMeters.monthlyReadings(this.companyId);
                })
                .finally(() => {
                    return designatedMeters.epimpHistory(this.companyId);
                })
                .finally(() => {
                    return designatedMeters.consumptionSummary(this.companyId);
                })
                .then(() => {
                    this.getMeters();
                    this.load();
                    this.refreshingData = false;
                })
                .catch(error => {
                    console.log(error);
                    this.refreshingData = false;
                    
                    this.$notify({
                        group: 'notification',
                        type: 'error',
                        title: 'Error al obtener datos de medidores',
                        text: 'Verifica que tus medidores estén funcionando correctamente '
                    });
                });
        },

        load(){
            let lineCharts = this.$refs.lineCharts
            lineCharts.delegateMethod('showLoading', 'Loading...')
            chartSpeed = Highcharts.chart('container-odometer', Highcharts.merge(gaugeOptions, {
                yAxis: {
                    min: 0,
                    max: 0,
                    title: {
                        text: 'Demanda'
                    }
                },

                credits: {
                    enabled: false
                },

                series: [{
                    name: 'Demanda',
                    data: [0],
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                            ('#485658') + '">{y}</span><br/>' +
                               '<span style="font-size:12px;color:#ADADAD">kW</span></div>'
                    },
                    tooltip: {
                        valueSuffix: ' kW'
                    }
                }]

            }));
            if(this.odometer > 0) this.updateOdometerChart()
            if(this.epimpHistory.length > 0) this.updateEpimpHistoryChart()
            if(this.consumptionSummary.length > 0) this.updatePieChart()
        },
        getMeters() {
            return new Promise((resolve, reject) => {
                designatedMeters.find({
                    filter: {
                        include: ['services'],
                        where: {
                            company_id: this.companyId
                        }
                    }
                }).then(res => {
                    this.meters = res;
                    let metersCount = this.meters.length;
                    if(metersCount > 0 && this.serviceSelected !== '') {
                        let currService = this.meters[0].services.filter(service => service.serviceName === this.serviceSelected)[0];
                        this.edsId = this.meters[0].meter_id;

                        this.$store.dispatch('socket/odometerReading', currService.dp);
                        this.$store.dispatch('socket/dailyReading', currService.dailyReadings);
                        this.$store.dispatch('socket/monthlyReading', currService.monthlyReadings);
                        this.$store.dispatch('socket/epimpHistoryReading', currService.epimp);
                        this.$store.dispatch('socket/consumptionSummary', currService.consumptionSummary);
                        this.$store.dispatch('socket/powerFactor', currService.fp);
                        this.$store.dispatch('socket/reactive', currService.reactive);

                        meters.consumptionMaxMinValues({id: this.edsId}).then((values)=> {
                            chartSpeed.update({
                                yAxis: {
                                    min: values.min,
                                    max: values.max
                                }
                            });
                        });
                        resolve();
                    }
                }).catch(err => {
                    reject(err);
                })
            });
        },
        updateEpimpHistoryChart() {
            let xAxis = [];
            let data = [];
            Object.values(this.epimpHistory).forEach(obj => {
                xAxis.push(parseDate(obj.date));
                data.push(parseFloat(obj.value));
            })
            let lineCharts = this.$refs.lineCharts;
            let chart = lineCharts.getChart();
            if (!chart.renderer.forExport) {
                lineCharts.delegateMethod('showLoading', 'Loading...');
                lineCharts.removeSeries();
                chart.update({
                    xAxis: { categories: xAxis }
                });
                asyncData.data = data;
                lineCharts.addSeries(asyncData);
                lineCharts.hideLoading();
            }
        },
        updateOdometerChart() {
            let point = chartSpeed.series[0].points[0]
            point.update(this.odometer)
        },
        updatePieChart() {
            this.chartData.datasets[0].data = [];
            this.chartData.labels = [];
            Object.values(this.consumptionSummary).forEach(device => {
                if(device.value > 0){
                    this.chartData.datasets[0].data.push(device.value);
                    this.chartData.labels.push(device.device);
                }
            });
        },
        prettifyNumbers(number){
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}
