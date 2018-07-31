<template>
    <b-row id="clients">
        <b-col>
            <Header :title="'Listado de compañías'" :action="'Agregar Compañía'" :modalId="'companyModal'" />
            <b-row class="list">
                <b-col>
                    <b-card>
                        <Table :items="items" :fields="fields" />
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
        <b-modal id="companyModal" size="lg" title="Compañía Nueva" @ok="createCompany">
            <b-form @submit.stop.prevent="createCompany">
                <b-row>
                    <b-col md="12">
                        <b-form-group label="Empresa">
                            <b-form-input type="text" v-model="newCompany.company_name" required></b-form-input>
                        </b-form-group>
                        <b-form-group label="Giro de la empresa">
                            <b-form-input type="text" v-model="newCompany.businessLine" required></b-form-input>
                        </b-form-group>
                        <b-form-group label="Número de Empleados">
                            <b-form-input type="number" min="0" v-model="newCompany.size" required></b-form-input>
                        </b-form-group>
                        <b-form-group label="Teléfono">
                            <b-form-input type="text" v-model="newCompany.phone" required></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-form>
        </b-modal>
    </b-row>
</template>

<script src="./companies"></script>