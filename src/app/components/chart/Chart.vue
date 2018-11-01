<template>
    <div id="graphs" >
        <div class="date-buttons--container">
            <b-button
                v-for="(button, index) in buttons[0].options"
                :key="index"
                :class="{'btn-success': currentPeriod === button.value, 'btn-outline-success':currentPeriod !== button.value}"
                @click="changePeriod(button.value)">
                {{ button.text }}
            </b-button>
        </div>
        <div class="chart-container">
            <vue-highcharts
                v-if="!dangerAlert"
                :options="lineOptions"
                ref="lineCharts">
            </vue-highcharts >
            <b-alert
                v-if="dangerAlert"
                show
                class="margin-top-1"
                variant="danger">
                Hubo un error al obtener los datos del medidor. ¡Refresca la página e intenta de nuevo!
            </b-alert>
        </div>
    </div>

</template>

<script src="./chart"></script>
