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
import eUsers from '@/services/eUsers';

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
      let newMaximums = {}
      for (var key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          if (this.form[key].activated) {
            newMaximums[key] = this.form[key].value; 
          }
        }
      }
      let id = this.$store.state.user.user.id;
      eUsers.updateMaximums(id, newMaximums)
      .then((res) => {
        if (!res) {
          this.$notify({
            group: 'notification',
            type: 'error',
            title: "Error al guardar",
            text: "los valores máximos no se han podido guardar"
          })
          return;
        }
        res = res.response;
        if (res.status === 200) {
          this.$notify({
            group: 'notification',
            type: 'success',
            title: "Éxito al guardar",
            text: "los valores máximos han sido modificados exitósamente"
          })
          this.$store.dispatch('user/updateUser', id);
        } else {
          this.$notify({
            group: 'notification',
            type: 'error',
            title: "Error al guardar",
            text: "los valores máximos no se han podido guardar"
          })
        }
      })
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user? this.$store.state.user.user : null;
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(newVal, oldVal)  {
        if (!newVal) return;
        
        let settings = newVal.settings
        
        for (let key in settings) {
          this.form[key].activated = true;
          this.form[key].value = settings[key]; 
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
