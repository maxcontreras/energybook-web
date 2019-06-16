<template>
    <b-row class="main">
        <b-row class="header">
            <div class="filters-container">
                <b-form-select
                    v-model="metersFilter.selected"
                    :options="metersFilter.options" class="mb-3" />
            </div>
        </b-row>
        <b-row id="carbon-footprint">
            <b-col>
                <b-row>
                    <b-col xl="4" lg="6">
                        <reading-card :style="cardStyle">
                            <template v-slot:right-header>
                                <h5>
                                    {{ currentDay }}
                                </h5>
                            </template>
                            <template v-slot:body>
                                <b-row class="properties">
                                    <b-col cols="12">
                                        <v-property
                                            property-name="Consumo"
                                            :property-value="consumption"
                                            property-unit="kWh"/>
                                    </b-col>
                                    <b-col cols="12">
                                        <v-property
                                            property-name="Generación"
                                            :property-value="generation"
                                            property-unit="kWh"/>
                                    </b-col>
                                    <b-col cols="12">
                                        <v-property
                                            property-name="Total"
                                            :property-value="total"
                                            property-unit="kWh"/>
                                    </b-col>
                                </b-row>
                            </template>
                        </reading-card>
                    </b-col>
                    <b-col xl="4" lg="6">
                        <reading-card :style="cardStyle">
                            <template v-slot:right-header>
                                <h5>
                                    {{ currentDay }}
                                </h5>
                            </template>
                            <template v-slot:body>
                                <b-row class="properties" >
                                    <b-col cols="12">
                                        <v-property
                                            property-name="Emisiones de CO2"
                                            :property-value="co2Emission"
                                            property-unit="t"/>
                                    </b-col>
                                </b-row>
                            </template>
                        </reading-card>
                    </b-col>
                    <b-col xl="4" lg="6">
                        <reading-card :style="cardStyle">
                            <template v-slot:right-header>
                                <h5>
                                    {{ currentDay }}
                                </h5>
                            </template>
                            <template v-slot:body>
                                <b-row class="properties">
                                    <b-col cols="12">
                                        <v-property
                                            property-name="Factor de emisión"
                                            :property-value="emissionFactor"/>
                                    </b-col>
                                    <b-col cols="12">
                                        <v-property
                                            property-name="Límite de emisiones de CO2"
                                            :property-value="co2Limit"/>
                                    </b-col>
                                </b-row>
                            </template>
                        </reading-card>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-row>
</template>

<script>
import ReadingCard from '@/app/components/ReadingCard';
import VProperty from '@/app/components/VProperty';
import designatedMeters from '@/services/designatedMeters';
import companies from '@/services/companies';
import meters from '@/services/meters';

export default {
    components: {
        ReadingCard,
        VProperty
    },

    data() {
        return {
            devices: [],
            cardStyle: {
                height: '160px'
            },
            metersFilter: {
                selected: "",
                options: []
            },
            eds: [],
            consumption: 0,
            emissionFactor: 0,
            generation: 0,
            co2Limit: 0,
            co2Emission: 0,
            total: 0,
            
        };
    },
    computed: {
        currentDay() {
            moment().locale();
            return moment().format('dddd D [de] MMMM');
        },
        companyId() {
            return this.$store.state.company_id
        }
    },
    watch: {
        companyId() {
            this.updateServices();
        },
        'metersFilter.selected': function() {
            this.getServerData();
        }
    },
    methods: {
        updateServices() {
            designatedMeters.find({
                filter: {
                    include: ['services'],
                    where: { company_id: this.companyId }
                }
            })
            .then(eds => {
                if (!eds[0]) return;
                this.eds = eds[0];
                if (this.eds.services) {
                    this.eds.services.forEach(service => {
                        this.metersFilter.options.push({
                            value:`${this.eds.meter_id}*EDS*${service.serviceName}`,
                            text: service.serviceName
                        });
                    });
                }
                this.eds.services;
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
            });
        },
        getServerData() {
            let selectedDevice = this.metersFilter.selected.split("*");
            selectedDevice = selectedDevice[2];
            designatedMeters.getCarbonFootprint(this.companyId, selectedDevice)
            .then((data) => {
                let response = data.response;
                //console.log(response);
                this.consumption = response.consumption;
                this.generation = response.generation;
                this.total = response.total;
                this.emissionFactor = response.emissionFactor;
                this.co2Emission = response.co2Emission;
                this.co2Limit = response.co2Limit;
            });
            
        }

    },
    mounted() {
        this.updateServices();
        this.getServerData();
    }
}
</script>

<style lang="scss" scoped>
.properties {
    > * {
        margin-bottom: .5rem;

        &:last-child {
            margin-bottom: 0;
        }

        &:first-child {
            margin-top: .5rem;
        }
    }
}
</style>
