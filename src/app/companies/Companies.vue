<template>
    <b-row id="clients">
        <b-col>
            <Header :title="'Listado de compañías'" :action="'Agregar Compañía'"/>
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

<script src="./companies"></script>