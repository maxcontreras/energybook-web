<template>
    <b-row id="meters" class="main">
        <b-col>
            <Header :title="'Listado de Medidores'" :action="'Agregar Medidor'"/>
            <b-row class="list">
                <b-col>
                    <b-card>
                        <b-table responsive hover :items="meters"></b-table>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./meters"></script>