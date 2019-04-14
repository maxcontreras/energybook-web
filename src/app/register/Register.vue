<template>
    <div id="register">
        <b-card id="register-container">
            <b-form @submit.prevent="login">
                <h5>Llena este formulario para obtener una versión demo de nuestro Software de Gestión y Eficiencia Energética.</h5>
                <hr/>
                <b-row>
                    <b-col md="6">
                        <b-form-group>
                            <b-form-input type="text" v-model="name" required placeholder="Nombre"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input type="text" v-model="lastname" required placeholder="Apellido"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input :type="'email'" v-model="email" required placeholder="Email"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input :type="'password'" v-model="password" required placeholder="Contraseña"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input :type="'password'" v-model="passwordConfirm" required placeholder="Confirmar Contraseña"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group>
                            <b-form-input type="text" v-model="company_name" required placeholder="Nombre de la empresa"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-select v-model="business_line_selected" :options="business_lines"/>
                        </b-form-group>
                        <b-form-group>
                             <b-form-select v-model="size_selected" :options="sizes"/>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input type="text" v-model="phone" placeholder="Teléfono"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-select v-model="state_selected" :options="states"/>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row align-h="end">
                    <b-col md="6">
                        <b-alert show variant="info">Tus datos están protegidos</b-alert>
                    </b-col>
                    <b-col md="6">
                        <b-button type="submit" variant="primary">Registrarse</b-button>
                        <p>¿Ya tienes tu cuenta?
                            <a><router-link to="login">Inicia sesión</router-link></a>
                        </p>
                    </b-col>
                </b-row>
            </b-form>
        </b-card>
    </div>
</template>

<script src="./register"></script>