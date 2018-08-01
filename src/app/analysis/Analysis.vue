<template>
    <b-row id="analysis" class="main">
        <b-col>
            <Header :title="'Análisis'"/>
            <b-row class="list">
                <b-col md="4">
                    <b-card>
                        <b-row class="analysis-card-header">
                            <b-col md="1">
                                <i class="fas fa-dot-circle analysis-off"></i>
                            </b-col>
                            <b-col md="11">
                                <h5>Medidor SDF32AS</h5>
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
                            <!--<b-col md="5">
                                
                            </b-col>
                            <b-col md="5" class="analysis-item-right--col">
                                <div>
                                    <p>Consumo</p>
                                    <h5>580 kWh </h5>
                                </div>
                                <hr/>
                                <div>
                                    <p>Consumo</p>
                                    <h5>580 kWh </h5>
                                </div>
                                <hr/>
                                <div>
                                    <p>Consumo</p>
                                    <h5>580 kWh </h5>
                                </div>
                            </b-col>-->
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./analysis"></script>