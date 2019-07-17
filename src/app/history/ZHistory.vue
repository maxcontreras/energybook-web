<template>
    <b-row id="readings-history" class="main">
        <b-col>
            <b-card no-body>
                <b-row class="card-header">
                    <b-col>
                        <h5>Historial de mediciones</h5>
                    </b-col>
                </b-row>
                <b-row class="card-body">
                    <b-col cols="12">
                        <b-row>
                            <b-col cols="12">
                                <div class="service-selector text-center">
                                   <b-form-select v-model="service" :options="services"/>
                                </div>
                                <div class="date-selector text-center">
                                    <span @click="changePeriod(-1, 0)">
                                        <i class="fas fa-arrow-alt-circle-left"></i>
                                    </span>
                                    <b-form-input
                                    v-model="month"
                                        type="text"
                                        disabled>
                                    </b-form-input>
                                    <span @click="changePeriod(1, 0)">
                                        <i class="fas fa-arrow-alt-circle-right"></i>
                                    </span>
                                </div>
                                <div class="date-selector text-center">
                                    <span @click="changePeriod(0, -1)">
                                        <i class="fas fa-arrow-alt-circle-left"></i>
                                    </span>
                                    <b-form-input
                                    v-model="year"
                                        type="text"
                                        disabled>
                                    </b-form-input>
                                    <span @click="changePeriod(0, 1)">
                                        <i class="fas fa-arrow-alt-circle-right"></i>
                                    </span>
                                </div>
                            </b-col>
                            <b-col
                                cols="12"
                                class="text-center">
                                <b-button
                                    variant="outline-dark"
                                    :disabled="isLoading"
                                    class="btn-confirmation"
                                    @click="getMonthlyHistory">
                                    Confirmar
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="12">
                        <div
                            v-if="isLoading"
                            class="loading-spinner text-center">
                            <img src="/assets/images/loading.svg" alt="loading">
                        </div>
                        <div
                            v-if="noData"
                            class="no-data-alert">
                            <b-alert class="tmp-alert" variant="warning" show>No hay datos que mostrar para el mes seleccionado</b-alert>
                        </div>
                        <b-row
                            v-if="!isLoading && hasData && !noData"
                            class="monthly-readings">
                            <b-col>
                                <div class="analysis-item--cat">
                                    <div class="icon-container">
                                        <img class="dashboard-image" src="/assets/images/consumption.svg"/>
                                    </div>
                                    <div class="data-container">
                                        <p>Consumo</p>
                                        <b-row>
                                            <b-col>
                                                <h5>{{data.consumption}}</h5>
                                                <span>kWh</span>
                                            </b-col>
                                            <b-col>
                                                <span>$</span>
                                                <h5>{{consumptionCost}}</h5>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </div>
                                <div class="analysis-item--cat">
                                    <div class="icon-container">
                                        <img class="dashboard-image" src="/assets/images/distribution.svg"/>
                                    </div>
                                    <div class="data-container">
                                        <p>Distribución</p>
                                        <b-row>
                                            <b-col>
                                                <h5>{{data.distribution}}</h5>
                                                <span>kW</span>
                                            </b-col>
                                            <b-col>
                                                <span>$</span>
                                                <h5>{{distributionCost}}</h5>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </div>
                                <div class="analysis-item--cat">
                                    <div class="icon-container">
                                        <img class="dashboard-image" src="/assets/images/capacity.svg"/>
                                    </div>
                                    <div class="data-container">
                                        <p>Capacidad</p>
                                        <b-row>
                                            <b-col>
                                                <h5>{{data.capacity}}</h5>
                                                <span>kW</span>
                                            </b-col>
                                            <b-col>
                                                <span>$</span>
                                                <h5>{{capacityCost}}</h5>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </div>
                                <div class="analysis-item--cat">
                                    <div class="icon-container">
                                        <img class="dashboard-image" src="/assets/images/fp.svg"/>
                                    </div>
                                    <div class="data-container">
                                        <p>F.P</p>
                                        <b-row>
                                            <b-col cols="6">
                                                <h5>{{data.fp}}</h5>
                                                <span>%</span>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import Services from '@/services/services';
import meters from '@/services/meters'
import designatedMeters from '@/services/designatedMeters'
import Constants from '@/constants.json';

export default {
    data() {
        return {
            date: moment().startOf('month').subtract(1, 'month').format(),
            service: 0,
            isLoading: false,
            data: {},
            noData: false,
            consumptionCost: 0
        };
    },
    computed: {
        month: {
            get() {
                const month = moment(this.date).format('MMMM');
                return `${month.charAt(0).toUpperCase()}${month.slice(1)}`;
            },
            set() {}
        },
        year: {
            get() {
                return moment(this.date).format('YYYY');
            },
            set() {}
        },
        services() {
            return this.$store.state.services.map((service, index) => ({value: index, text: service}));
        },
        companyId() {
            return this.$store.state.company_id;
        },
        hasData() {
            return this.data.consumption && this.data.distribution && this.data.capacity && this.data.fp;
        },
        cfePrices() {
            return this.$store.getters['meter/getCfePrices'];
        },
        distributionCost() {
            return (this.cfePrices.distributionPrice * parseFloat(this.data.distribution)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        capacityCost() {
            return (this.cfePrices.capacityPrice * parseFloat(this.data.capacity)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    methods: {
        changePeriod(months, years) {
            const new_date= moment(this.date).add(months, 'month').add(years, 'year').format();
            if (moment().startOf('month').isAfter(new_date)) {
                this.date = new_date;
            }
        },
        getMonthlyHistory() {
            this.noData = false;
            this.isLoading = true;
            const serviceSelected = this.services[this.service].text;
            Services.monthlyHistory(serviceSelected, this.companyId, this.date)
                .then(({data}) => {
                    if (data) {
                        let custom_dates = {
                            from: moment(this.date).startOf('month').format(),
                            until: moment(this.date).endOf('month').format()
                        }
                        designatedMeters.find({
                            filter: {
                                where: {
                                    company_id: this.companyId
                                }
                            }
                        }).then(mets => {
                            let edsId = mets[0].meter_id;
                            meters.getConsumptionCostsByFilter(edsId, '', serviceSelected, Constants.Meters.filters.custom, 86400, custom_dates)
                            .then(res => {
                                let cost = (res.reduce((prev, curr) => {
                                    return prev + parseFloat(curr.cost);
                                }, 0)).toFixed(2);
                                this.consumptionCost = cost.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            });
                        });
                        this.data = data;
                    } else {
                        this.noData = true;
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.noData = true;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }
    }
}
</script>

<style lang="scss">
$darkgray: #485658;

#readings-history {

    .loading-spinner,
    .no-data-alert {
        margin-top: 6rem;
        margin-bottom: 6rem;
    }

    .monthly-readings {
        margin-top: 4rem;
        margin-bottom: 4rem;

        .analysis-item--cat {
            width: 40%;
            margin: 0 auto;

            .data-container {
                width: 65%;
            }
        }
    }

    .card-header {
        h5 {
            font-size: 1.1rem;
            letter-spacing: 1px;
            font-weight: bold;
        }

        border-top-left-radius: 0.4rem;
        border-top-right-radius: 0.4rem;
        padding: 1.5rem 2rem 1rem;
        background-color: #ffffff;
        border-bottom: 1px solid #999999;
        margin: 0;
    }
    .card-body {
        .service-selector {
            .custom-select {
                margin: 0 auto;
                width: 200px;
                background-color: #e9ecef;
            }
        }
        .btn-confirmation {
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
        .date-selector {
            margin-top: 2rem;
            margin-bottom: 1rem;

            user-select: none;
            
            input {
                width: 13%;
                display: inline-block;
                margin: 0 auto;
            }

            span {
                i {
                    font-size: 1.6rem;
                    color: $darkgray;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }

            .prices {
                margin: 4rem 0;
            }
        }
    }
}
</style>