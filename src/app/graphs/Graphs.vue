<template>
    <b-row class="main">
        <b-col>
            <v-header
                :title="title"
                :filters="metersFilter"
                @SearchData="getData"/>
            <b-row class="list">
                <b-col>
                    <b-card
                        class="margin-bottom-1"
                        v-show="metersFilter[0].selected !== null">
                        <Chart
                            :meterId="metersFilter[0].selected"
                            :variable="'dp'"
                            :variableName="'Demanda'"
                            ref="dpChart"/>
                        <Chart
                            :meterId="metersFilter[0].selected"
                            :variable="'epimp'"
                            :variableName="'Consumo'"
                            ref="dpChart"/>
                    </b-card>
                    <b-alert
                        show
                        variant="info"
                        v-if="metersFilter[0].selected === null">
                        Selecciona un medidor para desplegar la gráfica.
                    </b-alert>
                    <b-card v-if="items.length > 0">
                        <v-table
                            :items="items"
                            :fields="fields"/>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./graphs"></script>
