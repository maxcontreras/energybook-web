<template>
    <div class="dashboard-parent">
        <b-row
            id="dashboard"
            class="main user-dashboard"
            v-show="!isAdmin">
            <b-col>
                <b-row class="dashboard-content-user">
                    <b-col>
                        <b-row class="margin-bottom-2 margin-top-1">
                            <b-col md="4">
                                <b-card class="daily-reading-card">
                                    <b-row class="analysis-card-header">
                                        <b-col md="4">
                                            <h5>Hoy</h5>
                                        </b-col>
                                        <b-col md="8">
                                            <h5 class="billable-period">
                                                {{ currentDay }}
                                            </h5>
                                        </b-col>
                                    </b-row>
                                    <b-row class="analysis-card-body">
                                        <b-col
                                            md="2"
                                            class="dashboard-icon-container">
                                            <img class="dashboard-image" src="/assets/images/consumption.png" />
                                        </b-col>
                                        <b-col
                                            md="10"
                                            class="dashboard-data-container">
                                            <p>Consumo</p>
                                            <h5>
                                                {{ consumption ? consumption : 0 }} kWh
                                            </h5>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                            <b-col md="4">
                                <b-card class="daily-reading-card">
                                    <b-row class="analysis-card-header">
                                        <b-col md="4">
                                            <h5>Hoy</h5>
                                        </b-col>
                                        <b-col md="8">
                                            <h5 class="billable-period">
                                                {{ currentDay }}
                                            </h5>
                                        </b-col>
                                    </b-row>
                                    <b-row class="analysis-card-body">
                                        <b-col
                                            md="2"
                                            class="dashboard-icon-container">
                                            <img class="dashboard-image" src="/assets/images/capacity.png"/>
                                        </b-col>
                                        <b-col
                                            md="10"
                                            class="dashboard-data-container">
                                            <p>Capacidad</p>
                                            <h5>
                                                {{ capacity ? capacity : 0 }} kW
                                            </h5>
                                            <h5 class="mt-3">
                                                $ {{ capacityCost ? capacityCost : 0 }}
                                            </h5>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                            <b-col md="4">
                                <b-card class="daily-reading-card">
                                    <b-row class="analysis-card-header">
                                        <b-col md="4">
                                            <h5>Hoy</h5>
                                        </b-col>
                                        <b-col md="8">
                                            <h5 class="billable-period">
                                                {{ currentDay }}
                                            </h5>
                                        </b-col>
                                    </b-row>
                                    <b-row class="analysis-card-body">
                                        <b-col
                                            md="2"
                                            class="dashboard-icon-container">
                                            <img class="dashboard-image" src="/assets/images/distribution.png"/>
                                        </b-col>
                                        <b-col
                                            md="10"
                                            class="dashboard-data-container">
                                            <p>Distribución</p>
                                            <h5>
                                                {{ distribution ? distribution : 0 }} kW
                                            </h5>
                                            <h5 class="mt-3">
                                                $ {{ distributionCost ? distributionCost : 0 }}
                                            </h5>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                        </b-row>

                        <b-row class="margin-bottom-2">
                            <b-col>
                                <b-card class="dashboard-general" no-body>
                                    <b-row class="analysis-card-header">
                                        <b-col>
                                            <h5>General</h5>
                                        </b-col>
                                        <b-col>
                                            <h5 class="billable-period">
                                                {{ billablePeriod }}
                                            </h5>
                                        </b-col>
                                    </b-row>
                                    <b-row class="general-body">
                                        <b-col md="6">
                                            <b-row class="analysis-item--data">
                                                <b-col>
                                                    <div class="analysis-item--cat">
                                                        <div class="icon-container">
                                                            <img class="dashboard-image" src="/assets/images/consumption.png"/>
                                                        </div>
                                                        <div class="data-container">
                                                            <p>Consumo</p>
                                                            <b-row>
                                                                <b-col>
                                                                    <h5>{{ consumptionMonth ? consumptionMonth : 0 }}</h5>
                                                                    <span>kWh</span>
                                                                </b-col>
                                                                <b-col>
                                                                    <span>$</span>
                                                                </b-col>
                                                            </b-row>
                                                        </div>
                                                    </div>
                                                    <div class="analysis-item--cat">
                                                        <div class="icon-container">
                                                            <img class="dashboard-image" src="/assets/images/distribution.png"/>
                                                        </div>
                                                        <div class="data-container">
                                                            <p>Distribución</p>
                                                            <b-row>
                                                                <b-col>
                                                                    <h5>{{ distributionMonth ? distributionMonth: 0 }}</h5>
                                                                    <span>kW</span>
                                                                </b-col>
                                                                <b-col>
                                                                    <span>$</span>
                                                                    <h5>{{ distributionMonthCost ? distributionMonthCost: 0 }}</h5>
                                                                </b-col>
                                                            </b-row>
                                                        </div>
                                                    </div>
                                                    <div class="analysis-item--cat">
                                                        <div class="icon-container">
                                                            <img class="dashboard-image" src="/assets/images/capacity.png"/>
                                                        </div>
                                                        <div class="data-container">
                                                            <p>Capacidad</p>
                                                            <b-row>
                                                                <b-col>
                                                                    <h5>{{ capacityMonth ? capacityMonth : 0 }}</h5>
                                                                    <span>kW</span>
                                                                </b-col>
                                                                <b-col>
                                                                    <span>$</span>
                                                                    <h5>{{ capacityMonthCost ? capacityMonthCost : 0 }}</h5>
                                                                </b-col>
                                                            </b-row>
                                                        </div>
                                                    </div>
                                                    <div class="analysis-item--cat">
                                                        <div class="icon-container">
                                                            <img class="dashboard-image" src="/assets/images/fp.png"/>
                                                        </div>
                                                        <div class="data-container">
                                                            <p>F.P</p>
                                                            <b-row>
                                                                <b-col cols="6">
                                                                    <h5>{{ powerFactor ? powerFactor : 0 }}</h5>
                                                                    <span>%</span>
                                                                </b-col>
                                                            </b-row>
                                                        </div>
                                                    </div>
                                                    <div class="analysis-item--cat">
                                                        <div class="icon-container">
                                                            <img class="dashboard-image" src="/assets/images/reactives.svg"/>
                                                        </div>
                                                        <div class="data-container">
                                                            <p>Reactivos</p>
                                                            <b-row>
                                                                <b-col cols="6">
                                                                    <h5>{{ reactives ? reactives : 0 }}</h5>
                                                                    <span>kVAR</span>
                                                                </b-col>
                                                            </b-row>
                                                        </div>
                                                    </div>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col md="6">
                                            <b-row>
                                                <b-col md="12" class="text-center">
                                                    <div
                                                        id="container-odometer"
                                                        ref="solidGauge"
                                                        class="container">
                                                    </div>
                                                </b-col>
                                                <b-col md="12">
                                                    <PieChart :data="chartData" :options="chartOptions" ref="mainChart"/>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-btn
                                            :disabled="refreshingData"
                                            class="refresh-btn"
                                            :class="refreshingData?'disable-refresh':'enable-refresh'"
                                            @click="refresh()">
                                        </b-btn>
                                    </b-row>
                                </b-card>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="12">
                                <b-card class="dashboard-history" no-body>
                                    <b-row class="analysis-card-header">
                                        <b-col>
                                            <h5>Historial</h5>
                                        </b-col>
                                    </b-row>
                                    <vue-highcharts
                                        :options="lineOptions"
                                        ref="lineCharts">
                                    </vue-highcharts>
                                </b-card>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <DashboardAdmin v-if="isAdmin"/>
    </div>

</template>

<script src="./dashboard"></script>
