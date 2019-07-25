<template>
  <b-row>
    <b-col>
      <b-form class="form" @submit.prevent="onSubmit">
        <h2>Máximos</h2>
        <hr>
        <b-alert show variant="info">Elija un valor máximo, si este es superado, se le notificará.</b-alert>
        <br>
        <b-form-select
          v-model="metersFilter.selected"
          :options="metersFilter.options" class="mb-3" />
        <br>
        <template v-if="isLoading">
          <div class="d-flex justify-content-center mb-3">
            <b-spinner variant="primary" label="Loading..."></b-spinner>
          </div>
        </template>
        <template v-else>
          <maximum-property :variable="form.DP"></maximum-property>
          <maximum-property :variable="form.EPimp"></maximum-property>
          <maximum-property :variable="form.Ssist"></maximum-property>
          <maximum-property :variable="form.Thdla"></maximum-property>
          <maximum-property :variable="form.Thdlb"></maximum-property>
          <maximum-property :variable="form.Thdlc"></maximum-property>
          <b-button pill type="submit">Guardar</b-button>
          <br><br>
        </template>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import designatedMeters from '@/services/designatedMeters';
import meters from '@/services/meters';
import MaximumProperty from './maximumProperty.vue'
import eUsers from '@/services/eUsers';

export default {
  data () {
    return {
      isLoading: true,
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
      },
      metersFilter: {
        selected: "",
        options: []
      },
      eds: []
    }
  },
  components: {
    maximumProperty: MaximumProperty
  },
  methods: {
    resetForm() {
      for (let key in this.form) {
        this.form[key].activated = false;
        this.form[key].value = 0.0;
      }
    },
    onSubmit() {
      let newMaximums = {}
      for (var key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          if (this.form[key].activated) {
            newMaximums[key] = this.form[key].value; 
          }
        }
      }
      let id = this.user.id;
      let meter = this.metersFilter.selected.split("*");
      let service = "";
      let device = "";

      if (meter[1] === "EDS") {
        service = meter[2];
      } else {
        device = meter[1];
      }
      // console.log(id);
      // console.log(newMaximums);
      // console.log(service);
      // console.log(device);
      eUsers.updateMaximums(id, newMaximums, service, device)
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
    },
    getMeters() {
      if(this.companyId === "") {
        return;
      }
      designatedMeters.find({
        filter: {
          include: ['services'],
          where: { company_id: this.companyId }
        }
      }).then(eds => {
        if (!eds[0]) return;
        this.eds = eds[0];
        
        if (this.eds.services) {
          this.eds.services.forEach(service => {
            this.metersFilter.options.push({
              value:`${this.eds.meter_id}*EDS*${service.serviceName}`,
              text: service.serviceName
            });
          });
        }
        meters.connectedDevices({
          id: this.eds.id
        })
        .then(devices => {
          devices.forEach((device, index) => {
            // Ignore first device. EDS
            if (index === 0) return;
            this.metersFilter.options.push({
              value:`${this.eds.meter_id}*${device.name}`,
              text: device.description
            });
          });
          this.metersFilter.selected = this.metersFilter.options[0].value;
        });
      });
    },
    updateMaximums() {
      if (this.user === "") return;
      if(this.metersFilter.selected === "") return;
      
      this.isLoading = true;
      this.resetForm();
      let meter = this.metersFilter.selected.split("*");
      let device = null;
      let service = null;
      if (meter[1] === "EDS") {
        service = meter[2];
      } else {
        device = meter[1];
      }
      let settings = service !== null ? this.user.settings[service] : this.user.settings[device];
      for (let key in settings) {
        if (!this.form[key]) {
          continue;
        }
        this.form[key].activated = true;
        this.form[key].value = parseFloat(settings[key]); 
      }
      this.isLoading = false;
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    companyId() {
      return this.$store.state.company_id;
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(newVal, oldVal)  {
        if (this.user === "") return;
        if (!newVal) return;
        this.updateMaximums();
      }
    },
    companyId: {
      immediate: true,
      handler() {
        this.getMeters();
      }
    },
    'metersFilter.selected': {
      immediate: true,
      handler() {
        if (this.metersFilter.selected === "") return;
        this.updateMaximums();
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

  .custom-select {
    border: none;
    width: 200px;
  }
</style>
