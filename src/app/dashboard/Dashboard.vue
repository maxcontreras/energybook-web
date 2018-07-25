<template>
    <b-row id="dashboard">
        <b-col>
            <Header :title="'Reportes'" :filters="filters" @SearchData="displayChart" />
            <b-row class="list" v-if="showChart || !isAdmin">
                <b-col md="12">
                    <b-card>
                        <chartist
                            ratio="ct-major-twelfth"
                            type="Line"
                            :data="chartData"
                            :options="chartOptions" >
                        </chartist>
                    </b-card>
                </b-col>
                <!--<b-col md="4">
                    <b-card>
                        <chartist
                            ratio="ct-major-second"
                            type="Pie"
                            :data="pieChartData"
                            :options="pieChartOptions" >
                        </chartist>
                    </b-card>
                </b-col>-->
            </b-row>
            <b-alert class="list" v-if="isAdmin && !showChart" show variant="info">Utiliza los filtros para seleccionar los datos requeridos y da clic en Buscar.</b-alert>
        </b-col>
    </b-row>
</template>

<script src="./dashboard"></script>

<style lang="scss">
@import '../../styles/dashboard.scss';
</style>