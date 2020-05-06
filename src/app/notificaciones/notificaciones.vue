<template>
  <b-row id="clients">
    <b-col>
      <b-row class="header">
        <b-col md="12">
          <b-button class="left" @click="MostarTodas" :variant="'success'">Mostrar Todas</b-button>
          <b-button class="left" @click="Consumo" :variant="'success'">Consumo</b-button>
          <b-button class="left" @click="Costo" :variant="'success'">Costo</b-button>
          <b-button class="left" @click="generacion" :variant="'success'">Generacion</b-button>
          <b-button class="left" @click="Demanda" :variant="'success'">Demanda</b-button>
          <b-button class="left" @click="Desconexion" :variant="'success'">Desconexion</b-button>
          <b-button class="left" @click="Horarios" :variant="'success'">Horarios</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card>
            <v-table :items="items" :fields="fields" @delete-notification="DeleteNotification" />
          </b-card>
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
import notificaciones from "@/services/notificaciones";
import VTable from "@/app/components/VTable.vue";
import VHeader from "@/app/components/VHeader.vue";

export default {
  components: {
    VHeader,
    VTable
  },

  data() {
    return {
      fields: [
        { key: "Fecha", sortable: true, label: "Fecha" },
        { key: "Dispositivos", label: "Dispositivos" },
        { key: "tipo", label: "Periodo" },
        { key: "Descripcion", label: "Descripcion" },
        { key: "id", label: "ver" },
        { key: "usuarios", label: "eliminar" }
      ],
      itemsrespaldo: [],
      items: [],
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
    MostarTodas() {
      this.items = [];
      this.itemsrespaldo.forEach(element => {
        this.items.push(element);
      });
    },
    Consumo() {
      this.items = [];
      this.itemsrespaldo.forEach(element => {
        if (element.tipo == "EPIMP") {
          this.items.push(element);
        }
      });
    },
    Costo() {
      this.items = [];
      this.itemsrespaldo.forEach(element => {
        if (element.tipo == "Costo") {
          this.items.push(element);
        }
      });
    },
    generacion() {},
    Demanda() {
      this.items = [];
      this.itemsrespaldo.forEach(element => {
        if (element.tipo == "Demanda") {
          this.items.push(element);
        }
      });
    },
    Desconexion() {
   this.items = [];
      this.itemsrespaldo.forEach(element => {
        if (element.tipo == "Desconexion") {
          this.items.push(element);
        }
      });
    },
    Horarios() {
      // FILTRAR POR HORARIOS
    },

    DeleteNotification(id) {
      notificaciones
        .delete(id)
        .then(respuesta => {})
        .catch(err => {
          console.log(err);
        });

      location.reload();
    },
    fetchnotificaciones() {
      var Company_ID = JSON.parse(localStorage.getItem("user")).company_id;
      var User_id = JSON.parse(localStorage.getItem("user")).id;
      notificaciones
        .verNotificaciones(User_id, Company_ID)
        .then(notificaciones => {
          console.log(notificaciones.Resultado[0]);
          console.log(notificaciones.Resultado[1]);

          notificaciones.Resultado[1].forEach(element => {
            notificaciones.Resultado[0].push(element);
          });

          this.items = notificaciones.Resultado[0];
          this.itemsrespaldo = notificaciones.Resultado[0];
          this.viejas = notificaciones.Resultado[1];
        });
    }
  }
};

/*
<!-->
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
  </div> <!--> */
</script>





