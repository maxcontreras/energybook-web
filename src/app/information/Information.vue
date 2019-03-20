<template>
    <b-row id="information-section" class="main">
        <b-col>
            <b-card no-body>
                <b-row class="card-header">
                    <b-col>
                        <h5>Información</h5>
                    </b-col>
                </b-row>
                <b-row class="card-body">
                    <b-col>
                        <v-table
                            :items="documents"
                            :fields="fields">
                        </v-table>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import VTable from '@/app/components/VTable.vue';

export default {
    components: {
        VTable
    },

    data() {
        return {
            documents: [
                {
                    number: 1,
                    title: 'Registro nacional de emisiones',
                    description: 'Guía de usuario para el reporte de emisiones',
                    date: moment().format('LL'),
                    status: true,
                    pdf: "https://drive.google.com/file/d/1BLPQ933ajXswP23OQsO-jKPsjEkFfJKt/view"
                }
            ],
            fields: [
                { key: 'number', label: 'Número de artículo' },
                { key: 'title', label: 'Título de artículo' },
                { key: 'description', label: 'Descripción' },
                { key: 'date', label: 'Fecha de actualización' },
                { key: 'status', label: 'Estado' },
                { key: 'pdf', label: 'Archivo' }
            ]
        }
    }
}
</script>

<style lang="scss">

#information-section {
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
}
</style>
