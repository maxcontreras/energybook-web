<template>
    <b-row id="register">
        <b-col md="9">
            <div id="login-container">
                <b-row align-h="center">
                    <b-col md="12">
                        <b-form @submit.prevent="signUp">
                            <h4>Registro</h4>
                            <p>Llena este formulario para obtener una versión demo de nuestro Software de Gestión y Eficiencia Energética.</p>
                            <hr/>
                                <b-row>
                                    <b-col md="5" style="margin-right: 5rem">
                                        <b-form-group label="Nombre">
                                            <b-form-input type="text" v-model="name" required></b-form-input>
                                        </b-form-group>
                                        <b-form-group label="Apellido">
                                            <b-form-input type="text" v-model="lastname" required></b-form-input>
                                        </b-form-group>
                                        <b-form-group label="Email">
                                            <b-form-input :type="'email'" v-model="email" required></b-form-input>
                                        </b-form-group>
                                        <b-form-group label="Contraseña">
                                            <b-form-input :type="'password'" v-model="password" required></b-form-input>
                                        </b-form-group>
                                        <b-form-group label="Confirmar Contraseña">
                                            <b-form-input :type="'password'" v-model="passwordConfirm" required></b-form-input>
                                        </b-form-group>
                                        <b-row>
                                            <b-col md="5">
                                                <b-button type="submit" variant="primary">Registrarse</b-button>
                                            </b-col>
                                            <b-col md="7">
                                                <p>¿Ya tienes tu cuenta? <a><router-link to="login">Inicia sesión</router-link></a></p>
                                            </b-col>
                                        </b-row>
                                        
                                        
                                    </b-col>
                                    <b-col md="5">
                                        <b-form-group label="Empresa">
                                            <b-form-input type="text" v-model="company_name" required></b-form-input>
                                        </b-form-group>
                                        <b-form-group label="Giro de tu empresa">
                                            <b-form-input type="text" v-model="businessLine" required></b-form-input>
                                        </b-form-group>
                                        <b-form-group label="¿Cuánta gente trabaja en tu empresa?">
                                            <b-form-input type="text" v-model="size" required></b-form-input>
                                        </b-form-group>
                                        <b-form-group label="Teléfono">
                                            <b-form-input type="text" v-model="phone" required></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row> 
                        </b-form>
                    </b-col>
                </b-row>
            </div>
        </b-col>
        <b-col lg="3" class="header-img">
        </b-col>
    </b-row>
</template>

<script src="./register"></script>
