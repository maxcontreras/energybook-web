<template>
    <b-row id="clients">
        <b-col>
            <b-row class="header">
                <b-col md="12">
                <b-card>
                    <h3>Listado de Compañías</h3>
                    <b-button :variant="'outline-success'">
                        Agregar Compañía
                    </b-button>
                </b-card>
                </b-col>
            </b-row>
            <b-row class="list">
                <b-col>
                    <b-card>
                        <b-table responsive hover :items="companies"></b-table>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./companies"></script>