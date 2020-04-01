<template>
  <b-row class="main">
    <b-col>
      <b-row class="header">
        <div class="filters-container">
          <b-form-select
            v-model="metersFilter.selected"
            :options="metersFilter.options"
            class="mb-3"
          />
        </div>
      </b-row>
      <b-row class="list">
        <b-col>
          <b-card
            class="margin-bottom-1"
            v-show="metersFilter.selected !== null"
          >
            <v-columns :meterId="metersFilter.selected" />
          </b-card>
          <b-alert show variant="info" v-if="metersFilter.selected === null">
            Selecciona un medidor para desplegar la gráfica.
          </b-alert>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable */
import designatedMeters from "@/services/designatedMeters";
import meters from "@/services/meters";
import VColumns from "@/app/components/chart/VColumns.vue";

export default {
  components: {
    VColumns
  },
  props: {
    companyIdProp: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      metersFilter: {
        selected: "",
        options: []
      },
      eds: []
    };
  },

  watch: {
    companyId() {
      this.getMeters();
    }
  },

  computed: {
    companyId() {
      return this.companyIdProp;
    }
  },

  beforeMount() {
    this.getMeters();
  },

  methods: {
    getMeters() {
      designatedMeters
        .find({
          filter: {
            include: ["services"],
            where: { company_id: this.companyId }
          }
        })
        .then(eds => {
          if (!eds[0]) return;
          this.eds = eds[0];
          if (this.eds.services) {
            this.eds.services.forEach(service => {
              this.metersFilter.options.push({
                value: `${this.eds.meter_id}*EDS*${service.serviceName}`,
                text: service.serviceName
              });
            });
          }
          meters
            .connectedDevices({
              id: this.eds.id
            })
            .then(devices => {
              devices.forEach((device, index) => {
                // Ignore first device. EDS
                if (index === 0) return;
                this.metersFilter.options.push({
                  value: `${this.eds.meter_id}*${device.name}`,
                  text: device.description
                });
              });
              this.metersFilter.selected = this.metersFilter.options[0].value;
            });
        });
    }
  }
};
</script>
