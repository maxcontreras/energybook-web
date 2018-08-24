<template>
    <b-row id="dashboard" class="main">
        <b-col>
            <b-row class="dashboard-content--admin" v-if="isAdmin">
                <b-col md="6">
                    <b-card class="list">
                        <Table :items="items" :fields="fields" />
                    </b-card>
                </b-col>
                <b-col md="6">
                    <b-card class="dashboard-map-container">
                        <GmapMap
                        :center="{lat:20.663782, lng:-103.3916394}"
                        :zoom="7"
                        map-type-id="roadmap"
                        >
                        <!--<GmapMarker
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m.position"
                            :clickable="true"
                            :draggable="true"
                            @click="center=m.position"
                        />-->
                        </GmapMap>
                    </b-card>
                </b-col>
            </b-row>
            <b-row class="dashboard-content-user" v-if="!isAdmin">
                <b-col>
                    <b-row class="margin-bottom-1 margin-top-1">
                        <b-col md="3">
                            <b-card>
                                <b-row>
                                    <b-col md="8" class="dashboard-data-container">
                                        <h5 class="green">
                                            1, 400 kWh
                                        </h5>
                                        <p>08-08-2018</p>
                                    </b-col>
                                    <b-col md="4" class="dashboard-icon-container">
                                        <i class="fas fa-bolt green"></i>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </b-col>
                        <!--<b-col md="2">
                            <b-card>
                                <b-row>
                                    <b-col md="4" class="dashboard-icon-container">
                                        <i class="fas fa-power-off blue"></i>
                                    </b-col>
                                    <b-col md="8" class="dashboard-data-container">
                                        <h5 class="blue">
                                            1, 400 $
                                        </h5>
                                        <p>08-08-2018</p>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </b-col>
                        <b-col md="2">
                            <b-card>
                                <b-row>
                                    <b-col md="4" class="dashboard-icon-container">
                                        <i class="fas fa-stream yellow"></i>
                                    </b-col>
                                    <b-col md="8" class="dashboard-data-container">
                                        <h5 class="yellow">
                                            1, 400 $
                                        </h5>
                                        <p>08-08-2018</p>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </b-col>-->
                    </b-row>
                    <b-row class="margin-bottom-1">
                        <b-col md="5">
                            <b-card>
                                <b-row class="analysis-card-header">
                                    <b-col>
                                        <h5>General</h5>
                                    </b-col>
                                </b-row>
                                <b-row class="analysis-item--data">
                                    <b-col md="6">
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
                        <!--<b-col md="4">
                            <b-card></b-card>
                        </b-col>
                        <b-col md="3">
                            <b-card></b-card>
                        </b-col>-->
                    </b-row>
                    <!--<Analysis :meters="meters"/>-->
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./dashboard"></script>

<style lang="scss">
@import '../../styles/dashboard.scss';
</style>