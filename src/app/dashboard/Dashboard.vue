<template>
    <b-row id="dashboard">
        <b-col>
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
            </b-row>
            <b-alert class="list" v-if="isAdmin && !showChart" show variant="info">Selecciona una compañía para desplegar información.</b-alert>
        </b-col>
    </b-row>
</template>

<script src="./dashboard"></script>

<style lang="scss">
@import '../../styles/dashboard.scss';
</style>