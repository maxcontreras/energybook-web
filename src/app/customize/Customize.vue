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
                        <free-trial />
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
                            :items="formattedInfoFiles"
                            :fields="infoFields"
                            @delete="deleteFile">
                        </v-table>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import FreeTrial from './FreeTrial.vue';
import PdfForm from './PDForm.vue';
import VTable from '@/app/components/VTable.vue';
import informationFile from '@/services/informationFiles';

export default {
    components: {
        PdfForm,
        FreeTrial,
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
                    this.addNewPdf(file);
                });
            });
    },

    computed: {
        formattedInfoFiles() {
            return this.infoFiles.map(file => {
                file.date = moment(file.date).format('LL');
                return file;
            });
        }
    },

    methods: {
        addNewPdf(file) {
            this.infoFiles.push({
                date: file.date,
                number: file.number,
                title: file.title,
                description: file.description,
                status: file.status,
                pdf: file.pdfFile,
                id: file.id
            });
        },
        deleteFile(pdf) {
            informationFile.destroyById({id: pdf.id})
                .then(() => {
                    this.infoFiles = this.infoFiles.filter(file => file.id !== pdf.id);
                })
                .catch(err => {
                    console.log(err);
                    this.notify('No se pudo borrar el archivo PDF', '', 'error');
                });
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
