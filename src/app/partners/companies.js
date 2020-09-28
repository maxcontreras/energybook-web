/* eslint-disable */
import companies from "@/services/companies";
import users from "@/services/eUsers";
import VHeader from "@/app/components/VHeader.vue";
import VTable from "@/app/components/VTable.vue";
import CompaniesForm from "@/app/partners/CompaniesForm.vue";
import Constants from "@/constants";

const companyStatus = Constants.Companies.status;

export default {
  components: {
    VHeader,
    VTable,
    CompaniesForm,
  },
  data() {
    return {
      companies: [],
      items: [],
      fields: [
        {
          key: "name",
          sortable: true,
          label: "Nombre",
        },
        {
          key: "phone",
          label: "Teléfono",
        },
        {
          key: "created_at",
          label: "Fecha de Registro",
        },
        {
          key: "size",
          label: "No. de Empleados",
        },
        {
          key: "type",
          label: "Tipo",
        },
        {
          key: "status",
          label: "Estado",
        },
        {
          key: "botonEditCompany",
          label: "Editar",
        },
        {
          key: "botonEliminarCompany",
          label: "Eliminar",
        },
      ],
      newCompany: {
        company_name: "",
        phone: "",
        size: "Mediana",
        location: {
          lat: 0,
          lon: 0,
        },
        city: 0,
        Division: 0,
        created_at: new Date(),
        legal_name: "",
        address: "",
        administrador: "",
      },
      newManager: {
        name: "",
        lastname: "",
        email: "",
      },
      newUser: {
        name: "",
        lastname: "",
        email: "",
      },
      toggle: {
        newManager: true,
        newUser: true,
      },
    };
  },

  beforeMount() {
    this.getCompanies();
  },

  computed: {
    divisiones() {
      return Constants.Divisiones.map((divisiones, index) => ({
        value: index,
        text: divisiones,
      }));
    },
    cities() {
      return Constants.Cities.map((city, index) => ({
        value: index,
        text: city,
      }));
    },
    tarifas() {
      return Constants.tarifas.map((tarifa, index) => ({
        value: index,
        text: tarifa,
      }));
    },
  },

  methods: {
    resetCompany() {
      this.newCompany = {
        company_name: "",
        phone: "",
        size: "Mediana",
        location: {
          lat: 0,
          lon: 0,
        },
        city: 0,
        Division: 0,
        domain: "",
        tariff_type: "",
        created_at: new Date(),
        legal_name: "",
        address: "",
      };
    },
    getCompanies() {
      var empresas = [];
      var companyID = JSON.parse(localStorage.getItem("user")).company_id;
      companies
        .find({
          filter: {
            where: { id: companyID },
          },
        })
        .then((empresa) => {
          var empresas = empresa[0].Administrando;

          companies.find({}).then((res) => {
            this.companies = res;
            this.companies.forEach((company) => {
              empresas.forEach((idempresa) => {
                if (company.id == idempresa) {
                  this.addCompany(company);
                }
              });
            });
          });
        });
    },
    verifyData() {
      /* if (isNaN(this.newCompany.location.lat) || isNaN(this.newCompany.location.lon))
                return false;
            this.newCompany.location.lat = parseFloat(this.newCompany.location.lat);
            this.newCompany.location.lon = parseFloat(this.newCompany.location.lon);
            if (!this.newCompany.company_name || !this.newCompany.phone || !this.newCompany.legal_name || !this.newCompany.address || !this.newCompany.domain)
                return false;
            if (!this.newManager.name || !this.newManager.lastname || !this.newManager.email)
                return false;

                */

      return true;
    },
    createCompany() {
      if (!this.verifyData()) {
        this.$notify({
          group: "notification",
          type: "warn",
          text: "Verifica que los datos estén llenados de la mejor manera",
        });
        return;
      }
      //this.newCompany.city = this.cities[this.newCompany.city].text;
      this.newCompany.Division = this.divisiones[this.newCompany.Division].text;
      this.newCompany.company_type = 1;
      this.newCompany.administrador = JSON.parse(
        localStorage.getItem("user")
      ).id;

      companies
        .create({ data: this.newCompany })
        .then((newCompany) => {
          this.addCompany(newCompany);
          if (this.newManager || this.newUser) {
            this.addNewCompanyUsers(newCompany);
          }
          this.resetCompany();
          this.$notify({
            group: "notification",
            type: "success",
            text: "La compañía se ha creado con éxito",
          });
        })
        .catch(() => {
          this.$notify({
            group: "notification",
            type: "error",
            text: "Hubo un error al crear la compañía",
          });
        });
      companies
        .find({
          filter: {
            where: {
              id: this.$store.state.user.user.company_id,
            },
          },
        })
        .then((empresa) => {
          var empresasids = [];
          var x = 0;
          for (x in empresa[0].Administrando) {
            empresasids.push(empresa[0].Administrando[x]);
          }
          companies.find({}).then((compañias) => {
            var company = compañias.pop();
            empresasids.push(company.id);
            companies
              .PATCH(this.$store.state.user.user.company_id, {
                Administrando: empresasids,
              })
              .then((res) => {});
          });
        });

      /* users
                 .find({
                     filter: {
                         where: {
                             name: this.$store.state.user.user.name
                         }
                     }
                 })
                 .then(usuario => {
                     var empresasids = []
                     var x = 0;
                     for (x in usuario[0].Administrando) {
                         empresasids.push(usuario[0].Administrando[x])
                     }
 
                     companies
                         .find({})
                         .then(compañias => {
                             var company = compañias.pop();
                             empresasids.push(company.id)
 
                             users
                                 .PATCH(usuario[0].id, {"Administrando": empresasids})
                                 .then(res => {})
                         });
 
                 })
                 */
    },
    DeleteCompany(id) {
      companies
        .delete(id)
        .then(() => {
          this.$notify({
            group: "notification",
            type: "success",
            text: "Compañia eliminada exitosamente",
          });

          location.reload();
        })
        .catch((err) => {
          console.log(err);
          this.$notify({
            group: "notification",
            type: "error",
            text: "Error al borrar Compañia",
          });
        });
    },

    addNewCompanyUsers(newCompany) {
      let data = {};
      data.company = newCompany;
      data.manager = this.newManager;

      if (this.newUser.email !== "") {
        data.user = this.newUser;
      }
      companies
        .addUsers({ data: data })
        .then(() => {
          this.$notify({
            group: "notification",
            type: "success",
            text: "Usuarios creados con éxito",
          });
        })
        .catch(() => {
          this.$notify({
            group: "notification",
            type: "error",
            text: "Hubo un error al crear usuarios",
          });
        });
    },
    addCompany(company) {
      this.items.push({
        name: company.company_name,
        phone: company.phone,
        created_at: moment(company.created_at).format("LL"),
        size: company.size,
        type: company.company_type,
        status: companyStatus[company.status],
        domain: company.domain,
        id: company.id,
        administrador: JSON.parse(localStorage.getItem("user")).id,
        botonEliminarCompany: company.id,
        botonEditCompany: company.id,
      });
    },
    EditInfo(id) {
      console.log(id);
    },
  },
};
