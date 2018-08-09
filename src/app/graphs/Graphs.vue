<template>
    <b-row class="main">
        <b-col>
            <Header :title="'Gráficas'"/>
            <b-row class="list">
                <b-col>
                    <b-card>
                        <Chart/>
                    </b-card>
                </b-col>
            </b-row>
            
        </b-col>
    </b-row>
</template>

<script src="./graphs"></script>