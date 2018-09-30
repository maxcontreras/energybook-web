<template>
    <div class="dashboard-parent">
        <b-row id="dashboard" class="main user-dashboard" v-show="!isAdmin">
            <b-col>
                <b-row class="dashboard-content-user">
                    <b-col>
                        <b-row class="margin-bottom-2 margin-top-1">
                            <b-col md="2">
                                <b-card>
                                    <b-row>
                                        <b-col md="8" class="dashboard-data-container">
                                            <h5 class="green">
                                                1, 400 kWh
                                            </h5>
                                            <p>Consumo</p>
                                        </b-col>
                                        <b-col md="4" class="dashboard-icon-container">
                                            <i class="fas fa-bolt green"></i>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                            <b-col md="2">
                                <b-card>
                                    <b-row>
                                        <b-col md="8" class="dashboard-data-container">
                                            <h5 class="blue">
                                                {{demand}} kWh
                                            </h5>
                                            <p>Demanda</p>
                                        </b-col>
                                        <b-col md="4" class="dashboard-icon-container">
                                            <i class="fas fa-power-off blue"></i>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                            <b-col md="2">
                                <b-card>
                                    <b-row>
                                        <b-col md="8" class="dashboard-data-container">
                                            <h5 class="yellow">
                                                1, 400 kWh
                                            </h5>
                                            <p>Capacidad</p>
                                        </b-col>
                                        <b-col md="4" class="dashboard-icon-container">
                                            <i class="fab fa-creative-commons-sampling-plus yellow"></i>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                            <b-col md="2">
                                <b-card>
                                    <b-row>
                                        <b-col md="8" class="dashboard-data-container">
                                            <h5 class="green">
                                                1, 400 kWh
                                            </h5>
                                            <p>Consumo</p>
                                        </b-col>
                                        <b-col md="4" class="dashboard-icon-container">
                                            <i class="fas fa-bolt green"></i>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                            <b-col md="2">
                                <b-card>
                                    <b-row>
                                        <b-col md="8" class="dashboard-data-container">
                                            <h5 class="blue">
                                                {{distributionCharge}} $
                                            </h5>
                                            <p>Distribución</p>
                                        </b-col>
                                        <b-col md="4" class="dashboard-icon-container">
                                            <i class="fas fa-power-off blue"></i>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                            <b-col md="2">
                                <b-card>
                                    <b-row>
                                        <b-col md="8" class="dashboard-data-container">
                                            <h5 class="yellow">
                                                1, 400 kWh
                                            </h5>
                                            <p>Capacidad</p>
                                        </b-col>
                                        <b-col md="4" class="dashboard-icon-container">
                                            <i class="fab fa-creative-commons-sampling-plus yellow"></i>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                        </b-row>
                        <b-row class="margin-bottom-2">
                            <b-col md="9">
                                <b-card>
                                    <b-row class="analysis-card-header">
                                        <b-col md="5">
                                            <h5>General</h5>
                                        </b-col>
                                        <b-col md="7">
                                            <h6>{{billablePeriod}}</h6>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col md="6">
                                            <b-row class="analysis-item--data">
                                                <b-col>
                                                    <div class="analysis-item--cat">
                                                        <div class="icon-container">
                                                            <i class="fas fa-bolt green"></i>
                                                        </div>
                                                        <div class="data-container">
                                                            <h5>580</h5>
                                                            <p>Consumo</p>
                                                        </div>
                                                        <div>
                                                            <span>kWh</span>
                                                        </div>
                                                        
                                                    </div> 
                                                    <div class="analysis-item--cat">
                                                        <div class="icon-container">
                                                            <i class="fas fa-chart-line green"></i>
                                                        </div>
                                                        <div class="data-container">
                                                            <h5>{{distribution}}</h5>
                                                            <p>Distribución</p>
                                                        </div>
                                                        <span>kW</span>
                                                    </div> 
                                                    <div class="analysis-item--cat">
                                                        <div class="icon-container">
                                                            <i class="fas fa-battery-full green"></i>
                                                        </div>
                                                        <div class="data-container">
                                                            <h5>0.98</h5>
                                                            <p>Capacidad</p>
                                                        </div>
                                                        <span>%</span>
                                                    </div> 
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col md="6" class="outer">
                                            <!--<VueHighChartsComponent :options="gaugeOptions" ref="gaugeChart"></VueHighChartsComponent>-->
                                            <div id="container-odometer" ref="solidGauge" class="container"></div>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                            <!--<b-col md="3">
                                <b-card>
                                    <PieChart :data="chartData" :options="chartOptions" ref="mainChart"/>
                                </b-card>
                            </b-col>-->
                            <b-col md="3">
                                <b-card>
                                    <weather 
                                        api-key="87a3a340f3f60b932c4b3e378fda841c"
                                        title="Hoy"
                                        :latitude="position.lat"
                                        :longitude="position.lng"
                                        language="es"
                                        units="ca">
                                    </weather>
                                </b-card>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="12">
                                <b-card>
                                    <b-row class="analysis-card-header">
                                        <b-col>
                                            <h5>Historial</h5>
                                        </b-col>
                                    </b-row>
                                    <vue-highcharts :options="lineOptions" ref="lineCharts"></vue-highcharts>
                                </b-card>
                            </b-col>
                            <!--<b-col md="4">
                                <b-card></b-card>
                            </b-col>-->
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <DashboardAdmin v-if="isAdmin"/>
    </div>
    
</template>

<script src="./dashboard"></script>