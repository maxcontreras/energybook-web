<template>
    <b-row id="customzie" class="main">
        <b-col lg="7">
            <b-card no-body>
                <b-row class="card-header">
                    <b-col>
                        <h5>Pruebas de software</h5>
                    </b-col>
                </b-row>
                <b-row class="card-body">
                    <b-col>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
        <b-col lg="5">
            <b-card
                class="information-files"
                no-body>
                <b-row class="card-header">
                    <b-col>
                        <h5>Archivos de Información</h5>
                    </b-col>
                </b-row>
                <b-row class="card-body">
                    <b-col cols="12">
                        <h3>Agregar archivo</h3>
                        <pdf-form />
                    </b-col>
                    <b-col>
                        <h3>Archivos en línea</h3>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import PdfForm from './PDForm.vue';

export default {
    components: {
        PdfForm
    }
}
</script>

<style lang="scss" scoped>
    .card-header {
        h5 {
            font-size: 1.1rem;
            letter-spacing: 1px;
            font-weight: bold;
        }

        border-top-left-radius: 0.4rem;
        border-top-right-radius: 0.4rem;
        padding: 1.5rem 2rem 1rem;
        background-color: #ffffff;
        border-bottom: 1px solid #999999;
        margin: 0;
    }

    .information-files {
        h3 {
            font-size: 1rem;
            letter-spacing: 1px;
        }
    }
</style>
