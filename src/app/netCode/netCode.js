/* eslint-disable */
import designatedMeters from '@/services/designatedMeters';
import datePicker from 'vue-bootstrap-datetimepicker';
import VSeries from '@/app/components/chart/VSeries';
import meters from '@/services/meters';
import axisParser from '@/mixins/axisParser';
import notify from '@/mixins/notify';
import datesValidator from '@/mixins/datesValidator';

const warnTitle = 'Petición en proceso';
const warnText = 'Por favor, espera mientras los datos de la gráfica se cargan';

export default {

    mixins: [axisParser, notify('notification'), datesValidator],

    components: {
        datePicker,
        VSeries
    },

    data() {
        return {
            metersFilter: {
                selected: "",
                options: []
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
                    { variables: ['Vunbl', 'lunbl'], name: 'Desbalance' },
                    { variables: ['Ssist'], name: 'kVA' }
                ]
            },
            graphInterval: {
                selected: 3600,
                options: [
                    {text: '1 hora', value: 3600},
                    {text: '30 minutos', value: 1800},
                    {text: '15 minutos', value: 900}
                ],
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
        },
        dayDifference() {
            if (this.date_custom.until && this.date_custom.from) {
                return moment(this.date_custom.until).diff(moment(this.date_custom.from), 'days');
            }
            return 0;
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
                        if (index === 0) return;
                        this.metersFilter.options.push({
                            value:`${this.eds.meter_id} ${device.name}`,
                            text: device.description
                        });
                    });
                    this.metersFilter.selected = this.metersFilter.options[0].value;
                });
            });
        },
        setCustomDate() {
            if (this.date_custom.from && this.date_custom.until && !this.currentChart.isLoading) {
                const {isValid, errorMessage} = this.validateDates(this.date_custom.from, this.date_custom.until, this.dayDifference);
                if(isValid) {
                    this.renderChartWithNewData();
                } else {
                    this.notify(errorMessage.title, errorMessage.text, 'warn');
                }
            }
        },
        changeType(new_type) {
            if (this.currentChart.isLoading) {
                this.notify(warnTitle, warnText, 'warn');
            } else if (new_type !== null && !this.dangerAlert) {
                this.graphType.selected = new_type;
                // Reset date picker values
                this.date_custom = {
                    from: null,
                    until: null
                }
                this.showDatePicker = false;
                this.graphPeriod.selected = 0;
                this.renderChartWithNewData();
            }
        },
        changePeriod(new_period) {
            if (this.currentChart.isLoading) {
                this.notify(warnTitle, warnText, 'warn');
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
                this.renderChartWithNewData();
            }
        },
        changeInterval(new_interval) {
            if (this.currentChart.isLoading) {
                this.notify(warnTitle, warnText, 'warn');
            } else if (new_interval !== null && !this.dangerAlert) {
                this.graphInterval.selected = new_interval;
                this.renderChartWithNewData();
            }
        },
        renderChartWithNewData() {
            this.currentChart.renderChartWithData()
                .then(() => {
                    this.getData();
                })
                .catch(() => {
                    console.log("Could not load new data");
                    this.dangerAlert = true;
                });
        },
        getData() {
            let meter = this.metersFilter.selected.split(" ");
            let meter_id = meter[0];
            let meter_device = (meter[1] === "EDS")? "":meter[1];
            meters.getNetCodeReadings(meter_id, meter_device, this.graphPeriod.selected, this.graphType.options[this.graphType.selected].variables, this.graphInterval.selected, this.date_custom)
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
            let { xAxis, tickInterval } = this.parseXAxis(dates, this.graphPeriod.selected, this.dayDifference, this.graphInterval.selected);
            return { data, xAxis, tickInterval };
        }
    }
}