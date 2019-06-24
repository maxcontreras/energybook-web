<template>
    <b-row class="main">
        <b-col>
            <b-row id="energy-generation">
                <b-col>
                    <b-row class="header">
                        <div class="filters-container">
                            <b-form-select
                                v-model="metersFilter.selected"
                                :options="metersFilter.options" class="mb-3" />
                        </div>
                    </b-row>
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
                                                property-name="Generación"
                                                :property-value="generation"
                                                property-unit="kWh"/>
                                        </b-col>
                                        <b-col cols="12">
                                            <v-property
                                                property-name="Auto consumo"
                                                :property-value="selfConsumption"
                                                property-unit="kWh"/>
                                        </b-col>
                                        <b-col cols="12">
                                            <v-property
                                                property-name="Inyección a la red"
                                                :property-value="networkInjection"
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
                                    <b-row class="properties">
                                        <b-col cols="12">
                                            <v-property
                                                property-name="Generación"
                                                :property-value="generationValue"
                                                property-unit="$"/>
                                        </b-col>
                                        <b-col cols="12">
                                            <v-property
                                                property-name="Auto consumo"
                                                :property-value="selfConsumptionValue"
                                                property-unit="$"/>
                                        </b-col>
                                        <b-col cols="12">
                                            <v-property
                                                property-name="Inyección a la red"
                                                :property-value="networkInjectionValue"
                                                property-unit="$"/>
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
                                                property-name="Emisiones de CO2"
                                                :property-value="co2e"
                                                property-unit="t"/>
                                        </b-col>
                                        <b-col cols="12">
                                            <v-property
                                                property-name="Factor de emisión"
                                                :property-value="emissionFactor "
                                                />
                                        </b-col>
                                    </b-row>
                                </template>
                            </reading-card>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row id="generation-graphs" class="list">
                <b-col>
                    <b-card
                        class="margin-bottom-1"
                        v-show="metersFilter.selected !== null">
                        <v-columns :meterId="metersFilter.selected"/>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
import ReadingCard from '@/app/components/ReadingCard';
import VProperty from '@/app/components/VProperty';
import designatedMeters from '@/services/designatedMeters';
import meters from '@/services/meters';
import VColumns from '@/app/components/chart/VColumnsGeneration.vue';


export default {
    components: {
        ReadingCard,
        VProperty,
        VColumns
    },

    data() {
        return {
            metersFilter: {
                selected: "",
                options: []
            },
            eds: [],
            cardStyle: {
                height: '170px'
            },
            generation: 0,
            generationValue: 0,
            selfConsumption: 0,
            selfConsumptionValue: 0,
            networkInjection: 0,
            networkInjectionValue: 0,
            emissionFactor: 0,
            co2e: 0
        };
    },
    computed: {
        companyId() {
            return this.$store.state.company_id;
        },
        currentDay() {
            moment().locale();
            return moment().format('dddd D [de] MMMM');
        }
    },
    methods: {
        getServerData() {
            let tmpArr = this.metersFilter.selected.split("*"); 
            let serviceName;
            let deviceName;
            if(tmpArr.length === 3) {
                //its service
                serviceName = tmpArr[2];
            } else if (tmpArr.length == 2) {
                //its device 
                deviceName = tmpArr[1];
            }
            designatedMeters.getGeneration(this.companyId, serviceName, deviceName)
            .then(res => {
                res = res.response;
                this.co2e = parseFloat(res.co2e.toFixed(2));
                this.generation = parseFloat(res.generation.toFixed(2));
                this.selfConsumption = parseFloat(res.selfConsumption.toFixed(2));
                this.networkInjection = parseFloat(res.networkInjection.toFixed(2));
                this.emissionFactor = parseFloat(res.emissionFactor.toFixed(2));
                this.generationValue = parseFloat(res.generationValue.toFixed(2));
                this.selfConsumptionValue = parseFloat(res.selfConsumptionValue.toFixed(2));
                this.networkInjectionValue = parseFloat(res.networkInjectionValue.toFixed(2));
                // console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        },
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
    mounted() {
        this.updateServices();
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

.list {
    margin-top: 1rem;
}
</style>
