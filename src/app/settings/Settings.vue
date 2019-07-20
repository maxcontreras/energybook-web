<template>
  <b-row>
    <b-col>
      <h1>Configuración</h1>
      <hr>
      <b-row class="settings-container" style="height: 750px; margin:1rem;">
        <b-col cols="2" class="settings-nav">
          <div @click="selectedSettings='notifications'" :class="{'current-view': selectedSettings === 'notifications' }">
            <i class="fas fa-bell"></i> Notificaciones
          </div>
        </b-col>
        <b-col cols="10" class="selected-settings-container">
          <component :is="selectedSettings"></component>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import Notification from './components/Notification.vue';

export default {
  data() {
    return {
      selectedSettings: 'notifications'
    }
  },
  components: {
    notifications: Notification
  }
}
</script>

<style lang="scss" scoped>
$white: #fcfcfcee;
$gray: #c2c2c2;
$gray1: #F3F4F5;
$gray2: #dee0e0;
.settings-container {
  box-shadow: 0 0 3px 0 $gray;
    
  .settings-nav {
    background-color: $gray1;
    padding: 0;
    
    i {
      margin-right: 0.4rem;
    }

    div {
      cursor: pointer;
      padding: 1rem 0 1rem 1.5rem;
      background-color: $gray1;

      &:hover {
        background-color: $white;
      }

      &.current-view {
        background-color: $white;
      }
    }
  }
}
.selected-settings-container {
  background-color: $white;
}
</style>
