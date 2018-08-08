<template>
    <b-row id="analysis" class="main">
        <b-col>
            <b-row class="list">
                <b-col md="4" v-for="(meter, index) in meters" :key="meter.id">
                    <b-card>
                        <b-row class="analysis-card-header">
                            <b-col md="1">
                                <i class="fas fa-dot-circle" v-bind:class="{'analysis-off': !meter.active, 'analysis-on': meter.active}"></i>
                            </b-col>
                            <b-col md="11">
                                <h5>Medidor {{meter.serial_number}}</h5>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col><h5 class="analysis-cost">$ 580.00 </h5></b-col>
                        </b-row>
                        <b-row align-h="around" class="analysis-item--data">
                            <b-col md="4">
                                <div>
                                    <p>Consumo</p>
                                    <h5>580 kWh </h5>
                                </div> 
                            </b-col>
                            <b-col md="4">
                                <div>
                                    <p>Demanda</p>
                                    <h5>580 kW </h5>
                                </div> 
                            </b-col>
                            <b-col md="4">
                                <div>
                                    <p>F.P.</p>
                                    <h5>0.98 % </h5>
                                </div> 
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./analysis"></script>