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
                        type="text"
                        v-model="company.phone"
                        required
                        placeholder="Teléfono">
                    </b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input
                        type="text"
                        v-model="company.businessLine"
                        required
                        placeholder="Giro">
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
        }
    },
    data() {
        return {}
    }
}
</script>
