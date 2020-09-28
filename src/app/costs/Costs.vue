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
          <b-alert show variant="info" v-if="metersFilter.selected === null"
            >Selecciona un medidor para desplegar la gráfica.</b-alert
          >
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
    VColumns,
  },

  data() {
    return {
      metersFilter: {
        selected: "",
        options: [],
      },
      eds: [],
    };
  },

  watch: {
    companyId() {
      this.getMeters();
    },
  },

  computed: {
    companyId() {
      return this.$store.state.company_id;
    },
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
            where: { company_id: this.companyId },
          },
        })
        .then((eds) => {
          if (!eds[0]) return;
          console.log(eds);
          this.eds = eds[0];

          if (eds[0].tipo == "Acuvim II") {
            this.eds.devices.forEach((service) => {
              this.metersFilter.options.push({
                value: `${service.name}*${service.id}`,
                text: service.name,
              });
            });
            this.metersFilter.selected = this.metersFilter.options[0].value;
          } else {
            if (this.eds.services) {
              this.eds.services.forEach((service) => {
                this.metersFilter.options.push({
                  value: `${this.eds.meter_id}*EDS*${service.serviceName}`,
                  text: service.serviceName,
                });
              });
            }
            meters
              .connectedDevices({
                id: this.eds.id,
              })
              .then((devices) => {
                devices.forEach((device, index) => {
                  // Ignore first device. EDS
                  if (index === 0) return;
                  this.metersFilter.options.push({
                    value: `${this.eds.meter_id}*${device.name}`,
                    text: device.description,
                  });
                });
                this.metersFilter.selected = this.metersFilter.options[0].value;
              });
          }
        });
    },
  },
};
</script>