<template>
    <b-row class="main">
        <b-col>
            <Header :title="title" :filters="metersFilter"  @SearchData="getData"/>
            <b-row class="list">
                <b-col>
                    <b-card class="margin-bottom-1" v-if="metersFilter[0].selected !== null">
                        <Chart :meterId="metersFilter[0].selected" :chartDataValues="chartData"/>
                    </b-card>
                    <b-alert show variant="info" v-if="metersFilter[0].selected === null">
                        Selecciona un medidor para desplegar la gráfica.
                    </b-alert>
                    <b-card v-if="items.length > 0">
                        <Table :items="items" :fields="fields"/>
                    </b-card>
                </b-col>
            </b-row>
            
        </b-col>
    </b-row>
</template>

<script src="./graphs"></script>