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
                                <v-cfe
                                    :fullWidth="false"
                                    :forceCurrentMonth="false"/>
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
import VCfe from '@/app/components/VCfe';
import _l from 'lodash';

export default {
    components: {
        VCfe
    },

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

            set() {}
        },

        selectedYear: {
            get() {
                return moment(this.$store.state.meter.cfeValues.date).format('YYYY');
            },

            set() {}
        }
    },

    methods: {
        changePeriod(type, quantity) {
            if (!this.isEditing) {
                if (type === 0) {   // Year
                    this.$store.dispatch('meter/changeCfePeriod', {years: quantity, months: 0});
                } else if (type === 1) {   // Month
                    this.$store.dispatch('meter/changeCfePeriod', {years: 0, months: quantity});
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

            .prices {
                margin: 4rem 0;
            }
        }
    }
}
</style>
