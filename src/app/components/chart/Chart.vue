<template>
    <div id="graphs" >
        <div class="date-buttons--container">
            <b-button v-for="(button, index) in buttons[0].options" :key="index" v-bind:class="{'btn-success': currentPeriod === button.value, 'btn-outline-success':currentPeriod !== button.value}" @click="changePeriod(button.value)">
                {{button.text}}
            </b-button>
        </div>
        <div class="chart-container">
            <LineChart :data="chartData" :options="chartOptions" ref="mainChart"/>
                <!--<BarChart v-show="currentChart === 1" :data="chartData" :options="chartOptions" ref="mainChart"/>-->
        </div>
                        <!--<div class="date-buttons--container">
                            <b-button v-for="(button, index) in buttons[1].options" :key="index" v-bind:class="{'btn-success': currentChart === button.value, 'btn-outline-success':currentChart !== button.value}" @click="currentChart = button.value" >
                                {{button.text}}
                            </b-button>
                        </div>-->
    </div>
     
</template>

<script src="./chart"></script>