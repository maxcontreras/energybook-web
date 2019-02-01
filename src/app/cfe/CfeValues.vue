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
                                    <div class="edit-buttons text-right">
                                        <span
                                            v-if="isEditing">
                                            <i class="far fa-save"></i>
                                        </span>
                                        <span
                                            @click="cancelEditing"
                                            v-if="isEditing">
                                            <i class="fas fa-trash-alt"></i>
                                        </span>
                                        <span
                                            @click="editFields"
                                            v-else>
                                            <i class="fas fa-edit"></i>
                                        </span>
                                    </div>
                                    <b-form-group
                                        label="Precio base:"
                                        label-for="base_price">
                                        <b-form-input
                                            v-model="base"
                                            id="base_price"
                                            :disabled="!isEditing"
                                            step="any"
                                            type="number">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                        label="Precio media:"
                                        label-for="middle_price">
                                        <b-form-input
                                            v-model="middle"
                                            id="middle_price"
                                            :disabled="!isEditing"
                                            step="any"
                                            type="number">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                        label="Precio punta:"
                                        label-for="peak_price">
                                        <b-form-input
                                            v-model="peak"
                                            id="peak_price"
                                            :disabled="!isEditing"
                                            step="any"
                                            type="number">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                        label="Precio capacidad:"
                                        label-for="capacity_price">
                                        <b-form-input
                                            v-model="capacity"
                                            id="capacity_price"
                                            :disabled="!isEditing"
                                            step="any"
                                            type="number">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                        label="Precio distribución:"
                                        label-for="distribution_price">
                                        <b-form-input
                                            v-model="distribution"
                                            id="distribution_price"
                                            :disabled="!isEditing"
                                            step="any"
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
import _l from 'lodash';

export default {
    data() {
        return {
            base: null,
            middle: null,
            peak: null,
            capacity: null,
            distribution: null,
            isEditing: false
        }
    },

    beforeMount() {
        this.resetPrices();
    },

    computed: {
        selectedMonth: {
            get() {
                let date = moment(this.$store.state.meter.cfeValues.date).format('MMMM');
                return date.charAt(0).toUpperCase() + date.slice(1);
            },

            set() {}
        },

        selectedYear: {
            get() {
                return moment(this.$store.state.meter.cfeValues.date).format('YYYY');
            },

            set() {}
        },

        basePrice() {
            return this.$store.state.meter.cfeValues.prices.base;
        },
        middlePrice() {
            return this.$store.state.meter.cfeValues.prices.middle;
        },
        peakPrice() {
            return this.$store.state.meter.cfeValues.prices.peak;
        },
        capacityPrice() {
            return this.$store.state.meter.cfeValues.prices.capacity;
        },
        distributionPrice() {
            return this.$store.state.meter.cfeValues.prices.distribution;
        }
    },

    watch: {
        basePrice(newValue) {
            this.base = newValue;
        },
        middlePrice(newValue) {
            this.middle = newValue;
        },
        peakPrice(newValue) {
            this.peak = newValue;
        },
        capacityPrice(newValue) {
            this.capacity = newValue;
        },
        distributionPrice(newValue) {
            this.distribution = newValue;
        }
    },

    methods: {
        resetPrices() {
            this.base = this.basePrice;
            this.middle = this.middlePrice;
            this.peak = this.peakPrice;
            this.capacity = this.capacityPrice;
            this.distribution = this.distributionPrice;
        },
        editFields() {
            this.isEditing = true;
        },
        cancelEditing() {
            this.isEditing = false;
            this.resetPrices();
        },
        changePeriod(type, quantity) {
            if (!this.isEditing) {
                if (type === 0) {   // Year
                    this.$store.dispatch('meter/changeCfeperiod', {years: quantity, months: 0});
                } else if (type === 1) {   // Month
                    this.$store.dispatch('meter/changeCfeperiod', {years: 0, months: quantity});
                }
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
        }

        .prices {
            margin: 4rem 0;

            .edit-buttons {
                margin-bottom: 2rem;

                span {
                    &:hover {
                        cursor: pointer;
                    }
                    margin-right: 1rem;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }

            .prices-form {
                width: 30% !important;
                margin: 0 auto;
            }
        }
    }
}
</style>
