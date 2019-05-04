<template>
    <b-row id="energy-generation">
        <b-col>
            <b-row>
                <b-col xl="4" lg="6">
                    <reading-card>
                        <template v-slot:right-header>
                            <h5>
                                {{ currentDay }}
                            </h5>
                        </template>
                        <template v-slot:body>
                            <b-row class="properties">
                                <b-col cols="12">
                                    <v-property
                                        property-name="Generacion"
                                        property-value="100,000"
                                        property-unit="kWh"/>
                                </b-col>
                                <b-col cols="12">
                                    <v-property
                                        property-name="Auto consumo"
                                        property-value="200"
                                        property-unit="kWh"/>
                                </b-col>
                                <b-col cols="12">
                                    <v-property
                                        property-name="Inyección a la red"
                                        property-value="400"
                                        property-unit="kWh"/>
                                </b-col>
                            </b-row>
                        </template>
                    </reading-card>
                </b-col>
                <b-col xl="4" lg="6">
                    <reading-card>
                        <template v-slot:right-header>
                            <h5>
                                {{ currentDay }}
                            </h5>
                        </template>
                        <template v-slot:body>
                            <b-row class="properties">
                                <b-col cols="12">
                                    <v-property
                                        property-name="Generacion"
                                        property-value="$100.00"/>
                                </b-col>
                                <b-col cols="12">
                                    <v-property
                                        property-name="Auto consumo"
                                        property-value="$200.00"/>
                                </b-col>
                                <b-col cols="12">
                                    <v-property
                                        property-name="Inyección a la red"
                                        property-value="$400.00"/>
                                </b-col>
                            </b-row>
                        </template>
                    </reading-card>
                </b-col>
                <b-col xl="4" lg="6">
                    <reading-card>
                        <template v-slot:right-header>
                            <h5>
                                {{ currentDay }}
                            </h5>
                        </template>
                        <template v-slot:body>
                            <b-row class="properties">
                                <b-col cols="12">
                                    <v-property
                                        property-name="Emisiones de CO2"
                                        property-value="100,000"
                                        property-unit="kWh"/>
                                </b-col>
                                <b-col cols="12">
                                    <v-property
                                        property-name="Emisiones de CH4"
                                        property-value="200"
                                        property-unit="kWh"/>
                                </b-col>
                                <b-col cols="12">
                                    <v-property
                                        property-name="Emisiones N2O"
                                        property-value="400"
                                        property-unit="kWh"/>
                                </b-col>
                            </b-row>
                        </template>
                    </reading-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
import ReadingCard from '@/app/components/ReadingCard';
import VProperty from './VProperty';

export default {
    components: {
        ReadingCard,
        VProperty
    },

    data() {
        return {

        };
    },

    computed: {
        currentDay() {
            moment().locale();
            return moment().format('dddd D [de] MMMM');
        }
    }
}
</script>

<style lang="scss" scoped>
.properties {
    > * {
        margin-bottom: .5rem;

        &:first-child {
            margin-top: .5rem;
        }
    }
}
</style>
