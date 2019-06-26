<template>
    <b-row class="main">
        <b-col>
            <b-row class="header">
                <div class="filters-container">
                    <b-form-select
                        v-model="metersFilter.selected"
                        :options="metersFilter.options" class="mb-3" />
                </div>
            </b-row>
            <b-row id="net-code-graphs">
                <b-col>
                    <b-card class="margin-bottom-1">
                        <div class="graphs">
                            <div class="date-buttons--container container-fluid">
                                <b-row>
                                    <b-col
                                        lg="5"
                                        md="12"
                                        class="text-left">
                                        <b-button variant="outline-dark"
                                            v-for="(type, index) in graphType.options"
                                            :key="index + 1"
                                            :class="{
                                                'btn-success': graphType.selected === index,
                                                'btn-outline-success': graphType.selected !== index
                                                }"
                                            @click="changeType(index)"
                                            >
                                            {{ type.name }}
                                        </b-button>
                                    </b-col>
                                    <b-col
                                        lg="7"
                                        md="12"
                                        class="text-right mt-lg-0 mt-md-2">
                                        <div
                                            class="datepickers"
                                            v-if="showDatePicker">
                                            <date-picker
                                                placeholder="Desde"
                                                v-model="date_custom.from"
                                                @dp-change="setCustomDate"
                                                :config="dateConfig">
                                            </date-picker>
                                            <date-picker
                                                class="mr-0"
                                                placeholder="Hasta"
                                                v-model="date_custom.until"
                                                @dp-change="setCustomDate"
                                                :config="dateConfig">
                                            </date-picker>
                                        </div>
                                        <b-button variant="outline-dark"
                                            v-for="(button, index) in graphPeriod.options"
                                            :key="index"
                                            :class="{
                                                'btn-success': graphPeriod.selected === button.value,
                                                'btn-outline-success': graphPeriod.selected !== button.value
                                                }"
                                            @click="changePeriod(button.value)">
                                            {{ button.text }}
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </div>
                            <div class="chart-container">
                                <div v-if="!dangerAlert">
                                    <v-series ref="seriesChart">
                                    </v-series>
                                    <div class="interval-buttons text-right">
                                        <b-button variant="outline-dark"
                                            v-for="interval in graphInterval.options"
                                            :key="interval.value"
                                            :class="{
                                                'btn-success': graphInterval.selected === interval.value,
                                                'btn-outline-success':graphInterval.selected !== interval.value
                                                }"
                                            @click="changeInterval(interval.value)">
                                            {{ interval.text }}
                                        </b-button>
                                    </div>
                                </div>
                                <b-alert
                                    v-else
                                    show
                                    class="margin-top-1"
                                    variant="danger">
                                    Hubo un error al obtener los datos del medidor. ¡Refresca la página e intenta de nuevo!
                                </b-alert>
                            </div>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./netCode"></script>
