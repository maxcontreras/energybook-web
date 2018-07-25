<template>
    <b-row id="login-view">
        <b-col lg="6" class="header-img">
            <b-row align-h="center">
                <div class="header">
                    <h3>Software de Gestión y Eficiencia <br/> Energética</h3>
                </div>
            </b-row>
        </b-col>
        <b-col lg="6">
            <div id="login-container">
                <b-row align-h="center">
                    <b-col md="6">
                        <b-form @submit.prevent="login">
                            <div class="logo">
                                <img src="/assets/logo.svg"/>
                            </div>
                            <b-form-group id="login-user">
                                <b-form-input type="text" v-model="email" required placeholder="Usuario">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="login-password">
                                <b-form-input type="password" v-model="password" required placeholder="Contraseña">
                                </b-form-input>
                            </b-form-group>
                            <b-button type="submit" variant="primary">Iniciar Sesión</b-button>
                            <a>¿Olvidaste tu contraseña?</a>
                        </b-form>
                        <div class="fixed-bottom">
                            <a>Obtén tu demo <b>GRATIS</b></a>
                        </div>
                    </b-col>
                </b-row>
            </div>
        </b-col>
    </b-row>
</template>

<script src="./login"></script>

<style lang="scss">
@import '../../styles/login.scss';
@import 'node_modules/bootstrap/scss/bootstrap.scss';
</style>
