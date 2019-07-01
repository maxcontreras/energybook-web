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
                                <div class="city-selector text-center">
                                   <b-form-select v-model="city" :options="cities"/>
                                </div>
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
                        </b-row>
                        <hr>
                        <b-row>
                            <b-col
                                lg="6"
                                md="12"
                                class="prices">
                                <p style="text-align:center"><b>GRAN DEMANDA EN MEDIA TENSIÓN HORARIA</b></p>
                                <v-cfeGDMTH
                                    ref="cfeValues"
                                    :fullWidth="false"
                                    :forceCurrentMonth="false"/>
                            </b-col>
                            <b-col
                                lg="6"
                                md="12"
                                class="prices">
                                <p style="text-align:center"><b>GRAN DEMANDA EN MEDIA TENSIÓN ORDINARIA</b></p>
                                <v-cfeGDMTO
                                    :fullWidth="false"
                                    :forceCurrentMonth="false"
                                />
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
import constants from '@/constants.json';
import VCfeGDMTH from '@/app/components/VCfeGDMTH';
import VCfeGDMTO from '@/app/components/VCfeGDMTO';
import _l from 'lodash';

export default {
    components: {
        VCfeGDMTH,        
        VCfeGDMTO
    },

    beforeMount() {
        this.city = this.selectedCity;
        this.$store.dispatch('meter/changeCfePeriod', {date: {years: 0, months: 0}, city: this.cities[this.city]});
    },

    data() {
        return {
            city: 0
        }
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

        selectedCity() {
            return this.$store.state.meter.cfeValues.citySelected;
        },

        userCompany() {
            return this.$store.getters['user/getUserCompany'];
        },

        cities() {
            return constants.Cities.map((city, index) => ({value: index, text: city}));
        }
    },

    watch: {
        city(newCity) {
            this.$store.dispatch('meter/changeCfePeriod', {date: {years: 0, months: 0}, city: this.cities[newCity]});
        }
    },

    methods: {
        changePeriod(type, quantity) {
            if (!this.$refs.cfeValues.isEditing) {
                if (type === 0) {   // Year
                    this.$store.dispatch('meter/changeCfePeriod', {date: {years: quantity, months: 0}, city: this.cities[this.city]});
                } else if (type === 1) {   // Month
                    this.$store.dispatch('meter/changeCfePeriod', {date: {years: 0, months: quantity}, city: this.cities[this.city]});
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
        .city-selector {
            .form-control {
                width: 13%;
                background-color: #e9ecef;
            }
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
