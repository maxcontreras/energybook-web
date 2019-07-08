<template>
    <div id="login">
        <notifications group="login" />
        <div class="info-container">
            <h3>
                MONITOREA, ANALIZA Y AHORRA <br/>ENERGÍA
            </h3>
            <h5>
                Crea tu cuenta gratis
            </h5>
            <b-button variant="primary" @click="openRegister">
                Regístrate
            </b-button>
        </div>

        <b-card id="login-container">
            <b-form @submit.prevent="login">
                <div class="logo">
                    <img src="/assets/Logotipo_iEnergybook.svg" />
                </div>
                <h5>¡Bienvenido! Ingresa a tu cuenta</h5>
                <b-form-group id="login-user">
                    <b-form-input type="text" v-model="email" required placeholder="Usuario" autocomplete="on">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="login-password">
                    <b-form-input type="password" v-model="password" required placeholder="Contraseña" autocomplete="on">
                    </b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Iniciar Sesión</b-button>
                <!--<a>¿Olvidaste tu contraseña?</a>-->
            </b-form>
        </b-card>
    </div>
</template>

<script src="./login"></script>
