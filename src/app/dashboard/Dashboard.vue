<template>
    <b-row id="dashboard" class="main">
        <b-col>
            <Header :title="'Dashboard'"/>

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
                    <Analysis :meters="meters"/>
                </b-col>
            </b-row>
        </b-col>
        
        <!--<b-col>
            <Header :title="'Reportes'" :isDashboard="true" :buttons="buttons" :filters="filters" @SearchData="displayChart" />
            <b-row class="list" v-show="showChart || !isAdmin">
                <b-col md="12">
                    <b-card>
                        <div class="dashboard-curr-date">
                            <p>
                            <i class="fas fa-chevron-left" @click="previous()"></i>
                            {{currentFormattedDate}}
                            <i class="fas fa-chevron-right" @click="next()"></i>
                            </p>
                        </div>
                        <div class="chart-container">
                            <Chart :data="chartData" :options="chartOptions" ref="mainChart"/>
                        </div>
                    </b-card>
                </b-col>
                <b-col md="4">
                    <b-card style="height: 45%; margin-bottom: 10%"></b-card>
                    <b-card style="height: 45%"></b-card>
                </b-col>
            </b-row>
            <b-alert class="list" v-if="isAdmin && !showChart" show variant="info">Selecciona una compañía para desplegar información.</b-alert>
        </b-col>-->
    </b-row>
</template>

<script src="./dashboard"></script>

<style lang="scss">
@import '../../styles/dashboard.scss';
</style>