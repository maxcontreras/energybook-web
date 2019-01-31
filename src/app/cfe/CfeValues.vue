<template>
    <b-row id="cfe-values" class="main">
        <b-col>
            <b-card no-body>
                <b-row class="card-header">
                    <b-col>
                        <h5>Valores CFE</h5>
                    </b-col>
                </b-row>
                <b-row class="card-body">
                    <b-col>
                        <b-row>
                            <b-col cols="12">
                                <div class="date-selector text-center">
                                    <span @click="changePeriod(1, -1)"><i class="fas fa-arrow-alt-circle-left"></i></span>
                                    <b-form-input
                                    v-model="selectedMonth"
                                        type="text"
                                        disabled>
                                    </b-form-input>
                                    <span @click="changePeriod(1, 1)"><i class="fas fa-arrow-alt-circle-right"></i></span>
                                </div>
                                <div class="date-selector text-center">
                                    <span @click="changePeriod(0, -1)"><i class="fas fa-arrow-alt-circle-left"></i></span>
                                    <b-form-input
                                    v-model="selectedYear"
                                        type="text"
                                        disabled>
                                    </b-form-input>
                                    <span @click="changePeriod(0, 1)"><i class="fas fa-arrow-alt-circle-right"></i></span>
                                </div>
                            </b-col>
                            <b-col
                                cols="12"
                                class="prices">
                                <b-form
                                    class="prices-form"
                                    @submit="(e) => {e.preventDefault()}">
                                    <b-form-group
                                        label="Precio base:"
                                        label-for="base_price">
                                        <b-form-input
                                            v-model="basePrice"
                                            id="base_price"
                                            type="number">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                        label="Precio media:"
                                        label-for="middle_price">
                                        <b-form-input
                                            v-model="middlePrice"
                                            id="middle_price"
                                            type="number">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                        label="Precio punta:"
                                        label-for="peak_price">
                                        <b-form-input
                                            v-model="peakPrice"
                                            id="peak_price"
                                            type="number">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                        label="Precio capacidad:"
                                        label-for="capacity_price">
                                        <b-form-input
                                            v-model="capacityPrice"
                                            id="capacity_price"
                                            type="number">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                        label="Precio distribución:"
                                        label-for="distribution_price">
                                        <b-form-input
                                            v-model="distributionPrice"
                                            id="distribution_price"
                                            type="number">
                                        </b-form-input>
                                    </b-form-group>
                                </b-form>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import moment from 'moment';

export default {
    data() {
        return {

        }
    },

    computed: {
        selectedMonth: {
            get() {
                let date = moment(this.$store.state.meter.cfeValues.date).format('MMMM');
                return date.charAt(0).toUpperCase() + date.slice(1);
            },

            set() {

            }
        },

        selectedYear: {
            get() {
                return moment(this.$store.state.meter.cfeValues.date).format('YYYY');
            },

            set() {

            }
        },

        basePrice: {
            get() {
                return this.$store.state.meter.cfeValues.prices.base;
            },
            set() {}
        },
        middlePrice: {
            get() {
                return this.$store.state.meter.cfeValues.prices.middle;
            },
            set() {}
        },
        peakPrice: {
            get() {
                return this.$store.state.meter.cfeValues.prices.peak;
            },
            set() {}
        },
        capacityPrice: {
            get() {
                return this.$store.state.meter.cfeValues.prices.capacity;
            },
            set() {}
        },
        distributionPrice: {
            get() {
                return this.$store.state.meter.cfeValues.prices.distribution;
            },
            set() {}
        }
    },

    methods: {
        changePeriod(type, quantity) {
            if (type === 0) {   // Year
                this.$store.dispatch('meter/changeCfeperiod', {years: quantity, months: 0});
            } else if (type === 1) {   // Month
                this.$store.dispatch('meter/changeCfeperiod', {years: 0, months: quantity});
            }
        }
    }
}
</script>

<style lang="scss">
$darkgray: #485658;

#cfe-values {
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
        .date-selector {
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
        }

        .prices {
            margin: 4rem 0;

            .prices-form {
                width: 30% !important;
                margin: 0 auto;
            }
        }
    }
}
</style>
