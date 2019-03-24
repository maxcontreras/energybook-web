/* eslint-disable */
import designatedMeters from '@/services/designatedMeters';
import datePicker from 'vue-bootstrap-datetimepicker';
import VSeries from '@/app/components/chart/VSeries';
import meters from '@/services/meters';
import { parseDate, parseDateTime, parseDayName } from '@/utils/dateTime';

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

    props: ['companyIdProp'],

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
                    {value: 2, text: 'Esta Semana'},
                    {value: 3, text: 'Este Mes'}
                ]
            },
            graphType: {
                selected: 0,
                options: [
                    { variables: ['DP'], name: 'Demanda' },
                    { variables: ['EPimp'], name: 'Consumo' }
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

    computed: {
        isAdmin() {
            return this.$store.state.isAdmin
        },
        companyId() {
            if(this.isAdmin) return this.companyIdProp
            return this.$store.state.company_id
        },
        isCosts() {
            return this.$route.name === 'costs'
        },
        title() {
            return this.isCosts? 'Costos': 'Gráficas'
        },
        meterSelected() {
            return this.metersFilter.selected;
        },
        currentChart() {
            return this.$refs.seriesChart;
        },
        shouldShowIntervals() {
            const selected = this.graphType.selected;
            return this.graphType.options[selected].name !== 'Demanda';
        }
    },

    watch: {
        companyId() {
            this.getMeters()
        },
        meterSelected() {
            this.showDatePicker = false;
            if (this.dangerAlert) this.dangerAlert = false;
            setTimeout(() => {
                this.changePeriod(0);
            }, 100);
        }
    },

    beforeMount() {
        this.getMeters()
    },

    methods: {
        getMeters() {
            designatedMeters.find({
                filter: {
                    include: ['services'],
                    where: { company_id: this.companyId }
                }
            }).then(eds => {
                if (eds.length > 0) {
                    this.eds = eds[0];
                    if (this.eds.services) {
                        this.eds.services.forEach(service => {
                            this.metersFilter.options.push({
                                value:`${this.eds.meter_id}*EDS*${service.serviceName}`,
                                text: service.serviceName
                            });
                        });
                    }
                    meters.connectedDevices({
                        id: this.eds.id
                    }).then(devices => {
                        devices.forEach((device, index) => {
                            // Ignore first device. EDS
                            if (index === 0) return;
                            this.metersFilter.options.push({
                                value:`${this.eds.meter_id}*${device.name}`,
                                text: device.description
                            });
                        });
                        this.metersFilter.selected = this.metersFilter.options[0].value;
                    });
                }
            })
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
            if (this.date_custom.from && this.date_custom.until && !this.currentChart.isLoading) {
                const {isValid, errorMessage} = this.validateDates();
                if(isValid) {
                    this.renderChartWithNewData();
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
                this.renderChartWithNewData();
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
                this.renderChartWithNewData();
            }
        },
        changeInterval(new_interval) {
            if (this.currentChart.isLoading) {
                this.$notify({
                    group: 'notification',
                    type: 'warn',
                    title: 'Petición en proceso',
                    text: 'Por favor, espera mientras los datos de la gráfica se cargan'
                });
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
            const meter = this.metersFilter.selected.split("*");
            const meter_id = meter[0];
            const meter_device = (meter[1] === "EDS")? '':meter[1];
            const service = (meter[1] === "EDS")? meter[2]: '';
            if (this.graphType.selected === 1) {
                if (this.currentPeriod > 3) {
                    interval = -1;
                }
                meters.getEpimpReadingsByFilter(meter_id, meter_device, service, this.graphPeriod.selected, this.graphInterval.selected, this.date_custom).then(res => {
                    if(res){
                        let { xAxis, tickInterval, data, zones } = this.parseMeterValues(res);
                        const update_data = {
                            xAxis: { categories: xAxis, tickInterval, tickmarkPlacement: "on" }
                        };
                        const series = [{ data, zones, name: 'Consumo', color: '#2f7ed8' }]
                        this.currentChart.updateChart(update_data);
                        this.currentChart.updateSeries(series);
                    }
                }).catch(error => {
                    console.log(error);
                    this.dangerAlert = true;
                    this.currentChart.load();
                });
            } else {
                meters.getDpReadingsByFilter(meter_id, meter_device, service, this.graphPeriod.selected, this.date_custom).then(res => {
                    if(res){
                        let { xAxis, tickInterval, data, zones } = this.parseMeterValues(res);
                        const update_data = {
                            xAxis: { categories: xAxis, tickInterval, tickmarkPlacement: "on" }
                        };
                        const series = [{ data, zones, name: 'Demanda', color: '#2f7ed8' }];
                        this.currentChart.updateChart(update_data);
                        this.currentChart.updateSeries(series);
                    }
                }).catch(error => {
                    console.log(error);
                    this.dangerAlert = true;
                    this.currentChart.load();
                });
            }
        },
        parseMeterValues(values) {
            const dates = [];
            const zones = [];
            let currVal = 0;
            let isPeak = false;
            
            let data = values.map(reading => {
                if (reading.isPeak !== undefined && reading.isPeak !== isPeak) {
                    zones.push({
                        value: currVal,
                        color: (reading.isPeak) ? '#2f7ed8' : '#ce1616'
                    });
                }
                currVal++;
                isPeak = reading.isPeak;

                dates.push(reading.date);
                return parseFloat(reading.value);
            });
            let { xAxis, tickInterval } = this.parseXAxis(dates);
            return { data, xAxis, tickInterval, zones };
        },
        parseXAxis(dates) {
            let tickInterval = 1;
            const xAxis = dates.map(date => {
                let time = parseDateTime(date);
                const day = parseDayName(date);
                const fullDate = parseDayName(date);
                time = time.slice(0, 5);
                if (this.graphPeriod.selected === -1) {
                    if (time === '00:00') {
                        time = '';
                    }
                    return `${fullDate} ${date.substring(0, 2)} ${time}`;
                }else if (this.graphPeriod.selected == 0) {
                    return `${time}`;
                } else if (this.graphPeriod.selected == 1) {
                    if (time === '00:00') {
                        time = '';
                    }
                    return `${day} ${time}`;
                } else {
                    if (time === '00:00') {
                        time = '';
                    }
                    return `${day} ${date.substring(0, 2)} ${time}`;
                }
            });
            switch (this.graphPeriod.selected) {
                case -1:
                    let interval = 0;
                    if (this.dayDifference === 0) interval = 1;
                    else if (this.dayDifference <= 2) interval = 12;
                    else interval = 24;
                    tickInterval = parseInt(3600/this.graphInterval.selected * interval);
                break;
                case 1:
                    tickInterval = parseInt(3600/this.graphInterval.selected * 2);
                break;
                case 2:
                    tickInterval = parseInt(3600/this.graphInterval.selected * 24);
                break;
                default:
                    tickInterval = parseInt(3600/this.graphInterval.selected);
            }
            return { xAxis, tickInterval };
        }
    }
}
