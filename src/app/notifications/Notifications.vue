<template>
  <b-row>
    <b-col>
      <div class="header">
        <h1>Notificaciones</h1>
        <a @click="goTo('notifications')">Configuración</a>
      </div>
      <hr>
      <b-row class="main">
        <p>lala</p>
      </b-row>
    </b-col>
  </b-row>  
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    goTo(route) {
        this.$router.push({name: route});
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  h1 {
    display: inline;
  }
}

.main {
  height: 100rem;
  background-color: white;
  margin: 1rem;
}
</style>
