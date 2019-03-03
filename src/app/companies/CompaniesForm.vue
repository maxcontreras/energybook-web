<template>
    <b-form @submit.stop.prevent="formSubmit">
        <b-row>
            <b-col md="6">
                <h5>
                    Datos de la Empresa
                </h5>
                <b-form-group>
                    <b-form-input
                        type="text"
                        v-model="company.company_name"
                        required
                        placeholder="Nombre comercial">
                    </b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input
                        type="text"
                        v-model="company.legal_name"
                        required
                        placeholder="Razón social">
                    </b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input
                        type="number"
                        v-model="company.phone"
                        required
                        placeholder="Teléfono">
                    </b-form-input>
                </b-form-group>
                <b-form-group label="Ciudad">
                    <b-form-select v-model="company.city" :options="cities"/>
                </b-form-group>
                <b-form-group label="coordenadas">
                    <b-form-input
                        class="company-position"
                        type="text"
                        v-model="company.location.lat"
                        required
                        placeholder="Latitud">
                    </b-form-input>
                    <b-form-input
                        class="company-position"
                        type="text"
                        v-model="company.location.lon"
                        required
                        placeholder="Longitud">
                    </b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input
                        type="text"
                        v-model="company.address"
                        required
                        placeholder="Dirección">
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col md="6">
                <div
                    class="company-manager"
                    v-if="availableManager">
                    <h5>
                        Agrega al gerente
                    </h5>
                    <b-form-group>
                        <b-form-input
                            type="text"
                            v-model="manager.name"
                            required
                            placeholder="Nombre">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input
                            type="text"
                            v-model="manager.lastname"
                            required
                            placeholder="Apellido">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input
                            :type="'email'"
                            v-model="manager.email"
                            required
                            placeholder="Email">
                        </b-form-input>
                    </b-form-group>
                </div>
                <div
                    class="company-user"
                    v-if="availableUser">
                    <h5>
                        Agrega un usuario
                    </h5>
                    <b-form-group>
                        <b-form-input
                            type="text"
                            v-model="user.name"
                            required
                            placeholder="Nombre">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input
                            type="text"
                            v-model="user.lastname"
                            required
                            placeholder="Apellido">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input
                            :type="'email'"
                            v-model="user.email"
                            required
                            placeholder="Email">
                        </b-form-input>
                    </b-form-group>
                </div>
            </b-col>
        </b-row>
    </b-form>
</template>

<script>
export default {
    name: 'CompaniesForm',
    props: {
        formSubmit: {
            type: Function,
            default: function() {}
        },
        company: {
            type: Object,
            required: true
        },
        availableUser: {
            type: Boolean,
            default: false
        },
        user: {
            type: Object,
            required: true
        },
        availableManager: {
            type: Boolean,
            default: false
        },
        manager: {
            type: Object,
            required: true
        },
        cities: {
            type: Array,
            required: true
        }
    },
    data() {
        return {}
    }
}
</script>

<style scss>
.company-position {
    width: 49% !important;
    display: inline-block !important;
}
</style>