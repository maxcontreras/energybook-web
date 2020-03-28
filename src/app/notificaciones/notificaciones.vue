<template>
  <div class="text-center" align="center">
    <br />
    <b-card
      class="mb-2"
      v-for="(item, index) in nuevas"
      :key="index"
      style=" width: 900px;
  left: 200px;
  margin-left: 20px;"
    >
      <div class="text-center">
        <h3>{{item["tipo"]}}</h3>
        <br />
        <p>Dispositivos</p>
        <b-card-text v-for="(itemss, index2) in item['Dispositivos']" :key="index2 ">{{itemss}}</b-card-text>
        <p>Servicios</p>
        <b-card-text v-for="(servicio, index3) in item['Servicios']" :key="index3">{{servicio}}</b-card-text>
        <p>{{item["En_Correos"]}}</p>
      </div>
    </b-card>
  </div>
</template>

<script>
/* eslint-disable */
import designatedMeters from "@/services/designatedMeters";
import meters from "@/services/meters";
import VColumns from "@/app/components/chart/VColumns.vue";
import notificaciones from "@/services/notificaciones";

export default {
  components: {},

  data() {
    return {
      nuevas: null,
      viejas: []
    };
  },
  created() {
    this.fetchnotificaciones();
  },

  watch: {},

  computed: {
    notificacion() {
      return this.$store.state.notificacion;
    },
    companyId() {
      return this.$store.state.company_id;
    }
  },

  methods: {
    fetchnotificaciones() {
      var Company_ID = JSON.parse(localStorage.getItem("user")).company_id;
      var User_id = JSON.parse(localStorage.getItem("user")).id;
      notificaciones
        .verNotificaciones(User_id, Company_ID)
        .then(notificaciones => {
          console.log(notificaciones.Resultado[0]);
          console.log(notificaciones.Resultado[1]);
          this.nuevas = notificaciones.Resultado[0];
          this.viejas = notificaciones.Resultado[1];
        });
    }
  }
};
</script>