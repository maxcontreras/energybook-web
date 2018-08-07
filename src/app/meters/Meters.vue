<template>
    <b-row id="meters" class="main">
        <b-col>
            <Header :title="'Medidores'" :action="'Agregar Medidor'"/>
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

<script src="./meters"></script>