<template>
  <div class="list">
    <b-alert v-if="items.length <= 0" show class="margin-top-1" variant="success">{{ alertMessage }}</b-alert>
    <b-table
      v-else
      responsive
      hover
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      @row-clicked="rowClickHandler"
    >
      <template v-slot:cell(status)="data">
        <i
          v-show="data.item.status"
          style="color: #2d9b14; font-size: 15px"
          class="fas fa-check-circle"
        ></i>
        <i
          v-show="!data.item.status"
          style="color: #ba0d0d; font-size: 15px"
          class="fas fa-times-circle"
        ></i>
      </template>
      <template v-slot:cell(botonEliminarCompany)="data">
        <button
          class="btn icon-btn delete"
          type="button"
          @click.stop="$emit('delete-company', data.item.id)"
        >
          <i class="far fa-trash-alt"></i>
        </button>
      </template>
      <template v-slot:cell(botonEditCompany)="data">
        <editcompany :DataCompany="data.item"></editcompany>
      </template>
      <template slot="pdf" slot-scope="data">
        <a class="btn btn-primary" :href="data.item.pdf" target="_blank">Ver PDF</a>
      </template>
      <template slot="Status" slot-scope="data">
        <b-button
          title="Click para cambiar estado"
          @click.stop="statusChange(data.item.id, data.item.Status)"
          :pressed.sync="data.item.Status"
          variant="primary"
        >
          <!--TODO Update this to computed propertie-->
          {{ data.item.Status ? 'Activo' : 'Inactivo' }}
        </b-button>
      </template>
      <template v-slot:cell(Reset)="data">
        <b-button
          @click.stop="$emit('reset-password', data.item)"
          variant="primary"
        >{{ 'Restaurar' }}</b-button>
      </template>
      <template v-slot:cell(Delete)="data">
        <button class="btn icon-btn delete" type="button" @click.stop="$emit('delete', data.item)">
          <i class="far fa-trash-alt"></i>
        </button>
      </template>
    </b-table>
    <b-row v-if="items.length > 0" class="table-pagination">
      <b-col md="2" class="my-1">
        <b-form-select :options="pageOptions" v-model="perPage" />
      </b-col>
      <b-col md="6" class="my-1">
        <b-pagination
          class="my-0"
          :total-rows="items.length"
          :per-page="perPage"
          v-model="currentPage"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import editcompany from "./editCompany";
export default {
  components: {
    editcompany: editcompany
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    route: {
      type: String,
      required: false
    },
    alertMessage: {
      type: String,
      default: "No hay elementos"
    },
    rowClickEvent: {
      type: Function,
      default: function() {}
    }
  },

  data() {
    return {
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15]
    };
  },

  computed: {
    status() {
      return data.item.Status ? "Activo" : "Inactivo";
    }
  },

  methods: {
    // TODO delete this method, replace with prop function
    rowClickHandler(record, index) {
      if (this.route) {
        if (this.route === "companyDetail") {
          this.$store.commit("setCurrentCompanyDetailId", record.id);
          this.$router.push({ name: this.route });
        }
        this.$router.push({ name: this.route, params: { id: record.id } });
      } else {
        this.$emit("clicked", { id: record.id, index, item: record });
      }
    },
    statusChange(rowId, status) {
      console.log(rowId, status);
      this.$emit("statusChange", { id: rowId, status: status ? 1 : 0 });
    }
  }
};
</script>