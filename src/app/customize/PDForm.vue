<template>
    <div class="create-pdf-container">
        <b-form-group
            label="Título del PDF"
            label-for="pdf-title">
            <b-form-input
                id="pdf-title"
                v-model="pdf.title"
                type="text"/>
        </b-form-group>
        <b-form-group
            label="Link al archivo"
            label-for="pdf-link">
            <b-form-input
                id="pdf-link"
                v-model="pdf.link"
                type="text"/>
        </b-form-group>
        <b-form-group
            label="Descripción"
            label-for="pdf-description">
            <b-form-textarea
                id="pdf-description"
                size="lg"
                v-model="pdf.description"
                type="text"/>
        </b-form-group>
        <b-form-group
            label="Número de artículo"
            label-for="pdf-number">
            <b-form-input
                id="pdf-number" 
                v-model="pdf.number"
                type="number"/>
        </b-form-group>
        <b-btn
            @click="createPDF">
            Subir archivo
        </b-btn>
        <b-btn
            @click="clearData">
            Limpiar celdas
        </b-btn>
    </div>
</template>

<script>
import informationFile from '@/services/informationFiles';
import notify from '@/mixins/notify';

export default {

    mixins: [notify('notification')],
    
    data() {
        return {
            pdf: {
                title: '',
                link: '',
                description: '',
                number: ''
            }
        }
    },

    methods: {

        validateFields() {
            const httpRegexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.){1}[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
            const inputsFilled = this.pdf.title.replace(/\s/g,"") !== "" &&
                                this.pdf.description.replace(/\s/g,"") !== "" &&
                                this.pdf.link.replace(/\s/g,"") !== "" &&
                                this.pdf.number.replace(/\s/g,"") !== "";
            const linkValid = httpRegexp.test(this.pdf.link);
            return inputsFilled && linkValid;
        },

        clearData() {
            this.pdf = {
                title: '',
                link: '',
                description: '',
                number: ''
            };
        },

        createPDF() {
            if (this.validateFields()) {
                informationFile.create({
                    data: {
                        pdfFile: this.pdf.link,
                        title: this.pdf.title,
                        description: this.pdf.description,
                        number: this.pdf.number,
                        date: new Date()
                    }
                }).then(res => {
                    this.$emit('createFile', res);
                    this.notify('Archivo PDF subido con éxito', '', 'success');
                    
                })
                .catch(err => {
                    console.log(err);
                    this.notify('No se pudo subir el PDF', '', 'error');
                });
            } else {
                this.notify('No se pudo subir el PDF', 'Revisa los datos', 'warn');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .create-pdf-container {
        margin: 3rem 0;
        padding: 0 10%;
    }
    #pdf-description {
        font-size: 1.1rem;
    }
</style>