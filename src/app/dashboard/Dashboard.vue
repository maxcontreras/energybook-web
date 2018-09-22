<template>
    <b-row id="dashboard" class="main">
        <b-col>
            <h5>
                {{currentFormattedDate}}
            </h5>
            <b-row class="dashboard-content-user">
                <b-col>
                    <b-row class="margin-bottom-1 margin-top-1">
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
                                            1, 400 kWh
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
                                            1, 400 kWh
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
                    <b-row class="margin-bottom-1">
                        <b-col md="6">
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
                                    <b-col md="7">
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
                                                        <h5>580</h5>
                                                        <p>Demanda</p>
                                                    </div>
                                                    <span>kW</span>
                                                </div> 
                                                <div class="analysis-item--cat">
                                                    <div class="icon-container">
                                                        <i class="fas fa-battery-full green"></i>
                                                    </div>
                                                    <div class="data-container">
                                                        <h5>0.98</h5>
                                                        <p>F. P.</p>
                                                    </div>
                                                    <span>%</span>
                                                </div> 
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                    <b-col md="5" class="gauge-chart-container">
                                        <VueHighChartsComponent :options="gaugeOptions" ref="gaugeChart"></VueHighChartsComponent>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </b-col>
                        <b-col md="3">
                            <b-card>
                                <PieChart :data="chartData" :options="chartOptions" ref="mainChart"/>
                                <!--<vue-highcharts :options="pieOptions" ref="pieChart"></vue-highcharts>-->
                            </b-card>
                        </b-col>
                        <b-col md="3">
                            <b-card bg-variant="info">
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
                        <b-col md="8">
                            <b-card>
                                <b-row class="analysis-card-header">
                                    <b-col>
                                        <h5>Historial</h5>
                                    </b-col>
                                </b-row>
                                <vue-highcharts :options="lineOptions" ref="lineCharts"></vue-highcharts>
                            </b-card>
                        </b-col>
                        <b-col md="4">
                            <b-card></b-card>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./dashboard"></script>

<style lang="scss">
@import '../../styles/dashboard.scss';
</style>