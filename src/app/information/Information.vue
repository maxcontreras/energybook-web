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
                            :items="formattedDocuments"
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
import informationFile from '@/services/informationFiles';

export default {
    components: {
        VTable
    },

    data() {
        return {
            documents: [],
            fields: [
                { key: 'number', label: 'Número de artículo' },
                { key: 'title', label: 'Título de artículo' },
                { key: 'description', label: 'Descripción' },
                { key: 'date', label: 'Fecha de actualización' },
                { key: 'status', label: 'Estado' },
                { key: 'pdf', label: 'Archivo' }
            ]
        }
    },

    beforeMount() {
        informationFile.find({})
            .then(files => {
                files.forEach(file => {
                    this.documents.push({
                        date: file.date,
                        number: file.number,
                        title: file.title,
                        description: file.description,
                        status: file.status,
                        pdf: file.pdfFile,
                        id: file.id
                    });
                });
            });
    },

    computed: {
        formattedDocuments() {
            return this.documents.map(file => {
                file.date = moment(file.date).format('LL');
                return file;
            });
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
