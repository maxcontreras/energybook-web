<template>
  <div id="login">
    <notifications group="login" />
    <div class="info-container">
      <h3>
        MONITOREA, ANALIZA Y AHORRA
        <br />ENERGÍA
      </h3>
      <h5>Crea tu cuenta gratis</h5>
      <b-button variant="primary" @click="openRegister">Regístrate</b-button>
    </div>

    <b-card id="login-container">
      <b-form @submit.prevent="login">
        <div class="logo">
          <img src="/assets/Logotipo_iEnergybook.svg" />
        </div>
        <h5>¡Bienvenido! Ingresa a tu cuenta</h5>
        <b-form-group id="login-user">
          <b-form-input
            type="text"
            v-model="email"
            required="required"
            placeholder="Usuario"
            autocomplete="on"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="login-password">
          <b-form-input
            type="password"
            v-model="password"
            required="required"
            placeholder="Contraseña"
            autocomplete="on"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Iniciar Sesión</b-button>

        <div>
          <a href="../../Aviso de privacidad.pdf">Checa nuestra politica de privacidad</a>
        </div>
        <br />
        <div align="left">
          <font size="1" align="left">by</font>
        </div>
        <b-row class="text-center">
          <b-col>
            <br />
            <p>
              iEnergybook
              <br />
              <font size="1">Version 3.05</font>
            </p>
          </b-col>
          <b-col>
            <img src="/assets/logo.png" width="80" height="80" />
          </b-col>
        </b-row>

        <!--<a>¿Olvidaste tu contraseña?</a>-->
      </b-form>
    </b-card>
  </div>
</template>

                <script src="./login"></script>