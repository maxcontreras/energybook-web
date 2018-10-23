<template>
    <b-row id="payments" class="main">
        <b-col>
            <v-header :title="'Pagos'"/>
            <b-row class="list">
                <b-col>
                    <b-card>
                        <v-table :items="items" :fields="fields"/>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./payments"></script>
