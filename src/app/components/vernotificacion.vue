<template>
  <div>
    <button
      @click="$bvModal.show(DataNotificacion.id)"
      title="Click para ver notificacion"
      variant="primary"
      class="btn"
    >
      <i class="fa fa-eye fa-lg" aria-hidden="true"></i>
    </button>

    <b-modal :id="DataNotificacion.id">
      <div slot="modal-title" class="clearfix">
        {{DataNotificacion.tipo}}
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <b-img right src="/assets/logo.png" alt="iEnergybook" width="40" height="40"></b-img>
      </div>

      <div>
        <p
          class="text-center"
          v-for="Dispositivos in DataNotificacion.Dispositivos"
          :key="(Dispositivos,index)"
        >{{Dispositivos}}</p>
      </div>

      <p class="text-center">servicios</p>

      <div>
        <p
          class="text-center"
          v-for="Servicios in DataNotificacion.Servicios"
          :key="(Servicios,index)"
        >{{Servicios}}</p>
      </div>

      <div slot="modal-footer">
        <b-button @click="$bvModal.hide(DataNotificacion.id)">Salir</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import companies from "../../services/companies.js";
export default {
  name: "editCompany",
  props: {
    DataNotificacion: Object
  },
  methods: {
    showModal() {
      this.$bvModal.show(this.DataNotificacion.id);
    }
  },
  data() {
    return {
      company: {
        company_name: "",
        phone: "",
        size: "Mediana",
        location: {
          lat: "",
          lon: ""
        },
        city: 0,
        created_at: new Date(),
        legal_name: "",
        address: "",
        domain: ""
      }
    };
  }
};
</script>