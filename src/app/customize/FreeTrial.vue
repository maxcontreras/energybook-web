<template>
  <b-row>
    <b-col lg="6">
      <h3>Compañía designada para pruebas de software</h3>
      <h5 v-if="freeTrialCompany">
        <i class="fas fa-building"></i>
        {{ freeTrialCompany.company_name }}
        <i
          class="fas fa-times-circle"
          @click="removeCompany"
        ></i>
      </h5>
      <b-alert
        v-else
        show
        variant="warning"
      >No existe una compañía designada para prueba de software</b-alert>
    </b-col>
    <b-col lg="6">
      <h3>Designar compañía</h3>
      <b-form-select v-model="selectedCompany" :options="companies" />
      <div class="text-center">
        <b-btn class="designate-btn" @click="designateCompany">Designar</b-btn>
      </div>
    </b-col>
    <b-col>
      <h3>Usuarios de prueba</h3>
      <v-table
        :items="freeTrialUsers"
        :fields="userFields"
        @delete="revokeFreeTrial"
        @clicked="showPersonalData"
      ></v-table>
      <confirmation-dialog
        title="Información de contacto"
        :showAcceptButton="false"
        :show="showContactData"
        @cancel="hidePersonalData"
        @hidden="hidePersonalData"
      >
        <b-form-group label="Nombre completo" label-for="fullname">
          <b-form-input id="fullname" disabled v-model="contactData.full_name" />
        </b-form-group>
        <b-form-group label="Nombre de la empresa" label-for="company-name">
          <b-form-input id="company-name" disabled v-model="contactData.company_name" />
        </b-form-group>
        <b-form-group label="Giro de la empresa" label-for="line">
          <b-form-input id="line" disabled v-model="contactData.business_line" />
        </b-form-group>
        <b-form-group label="Número de empleados" label-for="size">
          <b-form-input id="size" disabled v-model="contactData.size" />
        </b-form-group>
        <b-form-group label="Estado" label-for="state">
          <b-form-input id="state" disabled v-model="contactData.state" />
        </b-form-group>
        <b-form-group label="Teléfono" label-for="phone">
          <b-form-input id="phone" disabled v-model="contactData.phone" />
        </b-form-group>
      </confirmation-dialog>
    </b-col>
  </b-row>
</template>

<script>
import ConfirmationDialog from "@/app/components/ConfirmationDialog.vue";
import VTable from "@/app/components/VTable.vue";
import company from "@/services/companies";
import eUsers from "@/services/eUsers";
import notify from "@/mixins/notify";

export default {
  components: {
    VTable,
    ConfirmationDialog
  },

  mixins: [notify("notification")],

  data() {
    return {
      selectedCompany: null,
      raw_companies: [],
      freeTrialCompany: null,
      freeTrialUsers: [],
      showContactData: false,
      contactData: {},
      userFields: [
        { key: "name", label: "Nombre del usuario" },
        { key: "created_at", label: "Fecha de creación" },
        { key: "company_name", label: "Compañía asociada de prueba" },
        { key: "phone", label: "Teléfono" },
        { key: "Delete", label: "Revocar periodo de prueba" }
      ]
    };
  },

  beforeMount() {
    this.getCompanies();
    this.getTrialUsers();
  },

  computed: {
    companies() {
      return this.raw_companies.map(company => ({
        value: company.id,
        text: company.company_name
      }));
    }
  },

  methods: {
    getTrialUsers() {
      eUsers
        .find({
          filter: {
            where: {
              free_trial: true
            },
            include: ["company"]
          }
        })
        .then(users => {
          this.freeTrialUsers = users.map(user => ({
            company_name: user.company.company_name,
            contact_data: user.contact_data,
            name: `${user.name} ${user.lastname}`,
            phone: user.phone,
            created_at: moment(user.created_at).format("LL"),
            id: user.id
          }));
        });
    },

    getCompanies() {
      company
        .find({
          where: { status: 1 }
        })
        .then(res => {
          this.raw_companies = res.filter(company => !company.for_free_trial);
          this.selectedCompany =
            this.raw_companies[0] && this.raw_companies[0].id;
          let ftc = res.filter(company => company.for_free_trial);
          this.freeTrialCompany = ftc && ftc[0];
        })
        .catch(err => {
          console.log(err);
        });
    },

    designateCompany() {
      if (this.freeTrialCompany) {
        company
          .patch({ id: this.freeTrialCompany.id }, { for_free_trial: false })
          .then(updated => {
            this.raw_companies.push(updated);
            return company.patch(
              { id: this.selectedCompany },
              { for_free_trial: true }
            );
          })
          .then(freetrialCompany => {
            this.freeTrialCompany = freetrialCompany;
            this.raw_companies = this.raw_companies.filter(
              company => company.id !== this.selectedCompany
            );
            this.selectedCompany =
              this.raw_companies[0] && this.raw_companies[0].id;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        company
          .patch({ id: this.selectedCompany }, { for_free_trial: true })
          .then(freetrialCompany => {
            this.freeTrialCompany = freetrialCompany;
            this.raw_companies = this.raw_companies.filter(
              company => company.id !== this.selectedCompany
            );
            this.selectedCompany =
              this.raw_companies[0] && this.raw_companies[0].id;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    revokeFreeTrial(user) {
      eUsers
        .destroyById({ id: user.id })
        .then(() => {
          this.notify(
            "Licencia revocada",
            `El periodo de prueba del usuario ${user.name} ha terminado`,
            "success"
          );
          this.freeTrialUsers = this.freeTrialUsers.filter(
            usr => usr.id !== user.id
          );
        })
        .catch(() => {
          this.notify(
            "Error al revocar licencia",
            "No se pudo revocar la licencia en este momento",
            "error"
          );
        });
    },

    showPersonalData(item) {
      this.contactData = item.item.contact_data;
      this.showContactData = true;
    },

    hidePersonalData() {
      this.showContactData = false;
    },

    removeCompany() {
      company
        .patch(
          { id: this.freeTrialCompany ? this.freeTrialCompany.id : "" },
          { for_free_trial: false }
        )
        .then(updated => {
          this.freeTrialCompany = null;
          this.raw_companies.push(updated);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.designate-btn {
  margin-top: 2rem;
}

.custom-select {
  padding-bottom: 3px;
}

.fa-building {
  margin-right: 1rem;
}

.fa-times-circle {
  position: absolute;
  right: 0;
  color: rgb(216, 25, 25);
  cursor: pointer;
}
</style>
