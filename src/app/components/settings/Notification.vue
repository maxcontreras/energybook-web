<template>
  <b-row>
    <b-col>
      <b-form class="form" @submit.prevent="onSubmit">
        <h2>Máximos</h2>
        <hr>
        <b-alert show variant="info">Elija un valor máximo, si este es superado, se le notificará.</b-alert>
        <maximum-property :variable="form.DP"></maximum-property>
        <maximum-property :variable="form.EPimp"></maximum-property>
        <maximum-property :variable="form.Ssist"></maximum-property>
        <maximum-property :variable="form.Thdla"></maximum-property>
        <maximum-property :variable="form.Thdlb"></maximum-property>
        <maximum-property :variable="form.Thdlc"></maximum-property>
        <b-button pill type="submit">Guardar</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import MaximumProperty from './maximumProperty.vue'

export default {
  data () {
    return {
      form: {
        DP: {
          name: 'DP',
          activated: false,
          value: 0.0
        },
        EPimp: {
          name: 'EPimp',
          activated: false,
          value: 0.0  
        },
        Ssist: {
          name: 'Ssist',
          activated: false,
          value: 0.0  
        },
        Thdla: {
          name: 'Thdla',
          activated: false,
          value: 0.0  
        },
        Thdlb: {
          name: 'Thdlb',
          activated: false,
          value: 0.0  
        },
        Thdlc: {
          name: 'Thdlc',
          activated: false,
          value: 0.0  
        }
      }
    }
  },
  components: {
    maximumProperty: MaximumProperty
  },
  methods: {
    onSubmit() {
      for (var key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          if (this.form[key].activated) {
            console.log(key);
            console.log(this.form[key].value);
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  font-size: 14px;
  margin: 1rem 1rem 0 1rem;
}
</style>
