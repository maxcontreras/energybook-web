<template>
    <b-row class="main">
        <b-col>
            <Header :title="title" :filters="metersFilter"/>
            <b-row class="list">
                <b-col>
                    <b-card class="margin-bottom-1">
                        <Chart/>
                    </b-card>
                    <b-card>
                        <Table :items="items" :fields="fields"/>
                    </b-card>
                </b-col>
            </b-row>
            
        </b-col>
    </b-row>
</template>

<script src="./graphs"></script>