<template>
    <b-row id="payments" class="main">
        <b-col>
            <Header :title="'Listado de Pagos'"/>
            <b-row class="list">
                <b-col>
                    <b-card>
                        <Table :items="items" :fields="fields"/>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./payments"></script>