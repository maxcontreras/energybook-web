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
                            <b-form-input type="text" v-model="company_name" required placeholder="Empresa"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input type="text" v-model="businessLine" required placeholder="Giro de tu empresa"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input type="text" v-model="size" required placeholder="¿Cuánta gente trabaja en tu empresa?"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input type="text" v-model="phone" placeholder="Teléfono"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <gmap-autocomplete
                                class="form-control"
                                placeholder="Estado"
                                @place_changed="setPlace">
                            </gmap-autocomplete>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row align-h="end">
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