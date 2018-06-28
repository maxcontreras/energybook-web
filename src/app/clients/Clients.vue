<template>
    <b-row id="clients">
        <b-col>
            <b-row class="header">
                <b-col md="12">
                <b-card>
                    <h3>Listado de Clientes</h3>
                    <select class="selectpicker">
                        <option>Mustard</option>
                        <option>Ketchup</option>
                        <option>Relish</option>
                    </select>
                    <b-button :variant="'outline-success'">
                        Nuevo Cliente
                    </b-button>
                </b-card>
                </b-col>
            </b-row>
            <b-row class="list">
                <b-col>
                    <b-card>
                        <b-table responsive hover :items="items"></b-table>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./clients"></script>