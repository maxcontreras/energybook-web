<template>
    <b-row id="customzie" class="main">
        <b-col lg="5">
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
        <b-col lg="7">
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
                        <pdf-form @createFile="addNewPdf"/>
                    </b-col>
                    <b-col>
                        <h3>Archivos en línea</h3>
                        <v-table
                            :items="formatedInfoFiles"
                            :fields="infoFields">
                        </v-table>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import PdfForm from './PDForm.vue';
import VTable from '@/app/components/VTable.vue';
import informationFile from '@/services/informationFiles';

export default {
    components: {
        PdfForm,
        VTable
    },

    data() {
        return {
            infoFiles: [],
            infoFields: [
                { key: 'title', label: 'Título de artículo' },
                { key: 'date', label: 'Fecha de actualización' },
                { key: 'status', label: 'Estado' },
                { key: 'pdf', label: 'Archivo' },
                {key: 'Delete', label: 'Eliminar archivo'}
            ]
        }
    },

    beforeMount() {
        informationFile.find({})
            .then(files => {
                files.forEach(file => {
                    this.addNewPdf({
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
        formatedInfoFiles() {
            return this.infoFiles.map(file => {
                file.date = moment(file.date).format('LL');
                console.log(file);
                return file;
            });
        }
    },

    methods: {
        addNewPdf(pdf) {
            this.infoFiles.push(pdf);
        }
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
