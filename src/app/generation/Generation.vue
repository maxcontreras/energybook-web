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
                                                property-unit="kWh"
                                                :property-image="images.generation"
                                                />
                                        </b-col>
                                        <b-col cols="12">
                                            <v-property
                                                property-name="Auto consumo"
                                                :property-value="selfConsumption"
                                                property-unit="kWh"
                                                :property-image="images.selfConsumption"
                                                />
                                        </b-col>
                                        <b-col cols="12">
                                            <v-property
                                                property-name="Inyección a la red"
                                                :property-value="netInjection"
                                                property-unit="kWh"
                                                :property-image="images.netInjection"
                                                />
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
                                                property-unit="$"
                                                :property-image="images.generation"
                                                />
                                        </b-col>
                                        <b-col cols="12">
                                            <v-property
                                                property-name="Auto consumo"
                                                :property-value="selfConsumptionValue"
                                                property-unit="$"
                                                :property-image="images.selfConsumption"
                                                />
                                        </b-col>
                                        <b-col cols="12">
                                            <v-property
                                                property-name="Inyección a la red"
                                                :property-value="netInjectionValue"
                                                property-unit="$"
                                                :property-image="images.netInjection"
                                                />
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
                                                property-name="Eco2E"
                                                :property-value="co2e"
                                                property-unit="t"
                                                :property-image="images.co2e"
                                                />
                                        </b-col>
                                        <b-col cols="12">
                                            <v-property
                                                property-name="FE"
                                                :property-value="emissionFactor "
                                                :property-image="images.emissionFactor"
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
import Constants from '@/constants.json'; 

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
                height: '205px'
            },
            generation: 0,
            generationValue: 0,
            selfConsumption: 0,
            selfConsumptionValue: 0,
            netInjection: 0,
            netInjectionValue: 0,
            emissionFactor: 0,
            co2e: 0,
            images: {
                generation: {
                    src: Constants.images.generationCircle,
                    alt: "generation img"
                },
                selfConsumption: {
                    src: Constants.images.selfConsumption,
                    alt: "self consumption img"
                },
                netInjection: {
                    src: Constants.images.netInjection,
                    alt: "net injection img"
                },
                co2e: {
                    src: Constants.images.co2e,
                    alt: "co2e img"
                },
                emissionFactor: {
                    src: Constants.images.emissionFactor,
                    alt: "emission factor image"
                }
            }
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
            console.log(tmpArr)
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
                this.netInjection = parseFloat(res.networkInjection.toFixed(2));
                this.emissionFactor = parseFloat(res.emissionFactor.toFixed(2));
                this.generationValue = parseFloat(res.generationValue.toFixed(2));
                this.selfConsumptionValue = parseFloat(res.selfConsumptionValue.toFixed(2));
                this.netInjectionValue = parseFloat(res.networkInjectionValue.toFixed(2));
                 console.log(res);
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
