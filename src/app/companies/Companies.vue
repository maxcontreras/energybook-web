<template>
    <b-row id="clients">
        <b-col>
            <v-header :title="'Compañías'" :action="'Agregar Compañía'" :modalId="'companyModal'"/>
            <b-row>
                <b-col>
                    <b-card>
                        <v-table :items="items" :fields="fields"  :route="'companyDetail'"/>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
        <b-modal id="companyModal" size="lg" title="Compañía Nueva" @ok="createCompany">
            <b-form @submit.stop.prevent="createCompany">
                <b-row>
                    <b-col md="6">
                        <h5>Datos de la Empresa</h5>
                        <b-form-group>
                            <b-form-input type="text" v-model="newCompany.company_name" required placeholder="Nombre comercial"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input type="text" v-model="newCompany.legal_name" required placeholder="Razón social"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input type="text" v-model="newCompany.phone" required placeholder="Teléfono"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input type="text" v-model="newCompany.businessLine" required placeholder="Giro"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <div class="company-manager" v-if="toggle.newManager">
                            <h5>Agrega al gerente</h5>
                            <b-form-group>
                                <b-form-input type="text" v-model="newManager.name" required placeholder="Nombre"></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-form-input type="text" v-model="newManager.lastname" required placeholder="Apellido"></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-form-input :type="'email'" v-model="newManager.email" required placeholder="Email"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="company-user" v-if="toggle.newUser">
                            <h5>Agrega un usuario</h5>
                            <b-form-group>
                                <b-form-input type="text" v-model="newUser.name" required placeholder="Nombre"></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-form-input type="text" v-model="newUser.lastname" required placeholder="Apellido"></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-form-input :type="'email'" v-model="newUser.email" required placeholder="Email"></b-form-input>
                            </b-form-group>
                        </div>
                    </b-col>
                </b-row>
            </b-form>
        </b-modal>
    </b-row>
</template>

<script src="./companies"></script>
