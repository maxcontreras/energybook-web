<template>
    <div id="register">
        <notifications group="register" />
        <b-card id="register-container">
            <b-form @submit.prevent="signUp">
                <h5>Llena este formulario para obtener una versión demo de nuestro Software de Gestión y Eficiencia Energética.</h5>
                <hr/>
                <b-row>
                    <b-col md="6">
                        <b-form-group>
                            <b-form-input type="text" v-model="name" placeholder="Nombre"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input type="text" v-model="lastname" placeholder="Apellido"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input type="text" v-model="email" placeholder="Email"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input :type="'password'" v-model="password" placeholder="Contraseña"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input :type="'password'" v-model="passwordConfirm" placeholder="Confirmar Contraseña"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group>
                            <b-form-input type="text" v-model="company_name" placeholder="Nombre de la empresa"></b-form-input>
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
                          <!--<b-alert show variant="info">Tus datos están protegidos</b-alert> -->    
                    </b-col>
                    <b-col md="6">
                        <b-button type="submit" variant="primary" class="btn-register">Registrarse</b-button>
                        <p>¿Ya tienes tu cuenta? <a><router-link to="login">Inicia sesión</router-link></a>           
                        </p>
                      <b-alert show variant="info"><b-form-checkbox v-model= "checkbox" > <a href="../../Aviso de privacidad.pdf" download> Acepto el Aviso de privacidad</a></b-form-checkbox>
                      </b-alert>           
                    </b-col>
                </b-row>
            </b-form>
        </b-card>
    </div>
</template>

<style scoped>
    .btn-register:active{
        background-color: darkgray!important;
    }
</style>

<script src="./register"></script>