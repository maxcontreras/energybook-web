<template>
  <b-form-group :label="variable.name + ':'" label-for="dp">
    <b-form-checkbox 
    v-model="variable.activated"
    name="check-button"
    switch>Notificaciones {{variable.activated ? "activadas" : "desactivadas"}}</b-form-checkbox>
    <b-form-input 
      v-if="variable.activated" 
      id="dp" 
      v-model.number="variable.value"
      type="number"
      :state="state"
      min="0"
      max=""
      step="any">
    </b-form-input>
     <b-form-invalid-feedback :state="state">{{invalidFeedback}}</b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
export default {
  props: {
    variable: {
      type: Object,
      required: true
    }
  },
  computed: {
    state() {
      if (typeof this.variable.value === 'number' && this.variable.value >= 0) {
        return true;
      }
      return false;
    },
    invalidFeedback() {
      if (typeof this.variable.value !== 'number') {
        return 'Escriba un número'
      } if(this.variable.value < 0) {
      return 'El número debe de ser positivo, Ej. 1.25 ó 0.4';
      }
    }
  }
}
</script>

<style>

</style>
