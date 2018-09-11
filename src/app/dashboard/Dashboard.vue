<template>
    <b-row id="dashboard" class="main">
        <b-col>
            <b-breadcrumb :items="bcItems" v-if="meterId"/>
            <Header :filters="metersFilter" @SearchData="getDeviceVariables"/>
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
                        <b-col md="4">
                            <b-card>
                                <b-row class="analysis-card-header">
                                    <b-col>
                                        <h5>{{meterId? meters[0].device_name : 'General'}}</h5>
                                    </b-col>
                                </b-row>
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
                            </b-card>
                        </b-col>
                        <b-col md="4">
                            <b-card>
                            </b-card>
                        </b-col>
                        <b-col md="4">
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
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./dashboard"></script>

<style lang="scss">
@import '../../styles/dashboard.scss';
</style>