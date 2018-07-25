<template>
    <b-row id="payments" class="main">
        <b-col>
            <Header :title="'Listado de Pagos'"/>
            <b-row class="list">
                <b-col>
                    <b-card>
                        <b-table responsive hover :items="payments"></b-table>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./payments"></script>