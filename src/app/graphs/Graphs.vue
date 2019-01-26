<template>
    <b-row class="main">
        <b-col>
             <b-row class="header">
                <div class="filters-container">
                    <b-form-select
                        v-model="metersFilter.selected"
                        :options="metersFilter.options" class="mb-3" />
                </div>
            </b-row>
            <b-row class="list">
                <b-col>
                    <b-card
                        class="margin-bottom-1"
                        v-show="metersFilter.selected !== null">
                        <v-chart
                            :meterId="metersFilter.selected"
                            :variable="'dp'"
                            :variableName="'Demanda'"
                            :graph-type="graphType"
                            ref="dpChart"/>
                    </b-card>
                    <b-alert
                        show
                        variant="info"
                        v-if="metersFilter.selected === null">
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
