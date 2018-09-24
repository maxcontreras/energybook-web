<template>
    <div id="graphs" >
        <div class="date-buttons--container">
            <b-button v-for="(button, index) in buttons[0].options" :key="index" v-bind:class="{'btn-success': currentPeriod === button.value, 'btn-outline-success':currentPeriod !== button.value}" @click="changePeriod(button.value)">
                {{button.text}}
            </b-button>
        </div>
        <div class="chart-container">
            <vue-highcharts :options="lineOptions" ref="lineCharts"></vue-highcharts>
        </div>
    </div>
     
</template>

<script src="./chart"></script>