/* eslint-disable */
import companies from "@/services/companies";
import VHeader from "@/app/components/VHeader.vue";
import VTable from "@/app/components/VTable.vue";
import CompaniesForm from "@/app/companies/CompaniesForm.vue";
import Constants from "@/constants";
import users from "@/services/eUsers";

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
      admins: [{ value: 0, text: "Selecciona una compañía" }],
      items: [],
      fields: [
        { key: "name", sortable: true, label: "Nombre" },
        { key: "phone", label: "Teléfono" },
        { key: "created_at", label: "Fecha de Registro" },
        { key: "size", label: "No. de Empleados" },
        { key: "type", label: "Tipo" },
        { key: "status", label: "Estado" },
      ],
      newCompany: {
        company_name: "",
        phone: "",
        size: "Mediana",
        location: {
          lat: "",
          lon: "",
        },
        city: 0,
        created_at: new Date(),
        legal_name: "",
        address: "",
      },
      newManager: {
        name: "",
        lastname: "",
        email: "",
        Administrando: ["Ninguno"],
      },
      newUser: {
        name: "",
        lastname: "",
        email: "",
        contraseña: "",
        celular: "",
        puesto: "",
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
    cities() {
      return Constants.Cities.map((city, index) => ({
        value: index,
        text: city,
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
          lat: "",
          lon: "",
        },
        city: 0,
        domain: "",
        created_at: new Date(),
        legal_name: "",
        address: "",
        licencia: "",
      };
    },
    getCompanies() {
      companies.find({}).then((res) => {
        this.companies = res;
        this.companies.forEach((company) => {
          if (company.administra) {
          } else {
            this.addCompany(company);
          }
        });
      });
    },
    getAdmins() {
      users.find({}).then((user) => {
        user.forEach((usuario) => {
          if (usuario.role_id == 1 && usuario.Administrando) {
            this.admins.push({
              value: usuario.id,
              text: usuario.name + usuario.lastname,
            });
          }
        });
      });
    },
    verifyData() {
      console.log("nuevaempresa");
      console.log(this.newCompany);
      console.log("nuevousuario");
      console.log(this.newUser);

      /*   if (isNaN(this.newCompany.location.lat) || isNaN(this.newCompany.location.lon)) return false;
            this.newCompany.location.lat = parseFloat(this.newCompany.location.lat);
            this.newCompany.location.lon = parseFloat(this.newCompany.location.lon);
            if (!this.newCompany.company_name || !this.newCompany.phone || !this.newCompany.legal_name || !this.newCompany.address) return false;
            if (!this.newManager.name || !this.newManager.lastname || !this.newManager.email) return false; 
            if(!this.newCompany.domain) return false;
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
      // this.newCompany.city = this.cities[this.newCompany.city].text;
      this.newCompany.company_type = 1;
      this.newCompany.administra = true;
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
    },
    addNewCompanyUsers(newCompany) {
      let data = {};
      data.company = newCompany;
      data.manager = this.newManager;

      if (this.newUser.email !== "") {
        data.user = this.newUser;
      }
      console.log("corriste?");
      companies
        .addAdmins({ data: data })
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
        id: company.id,
        domain: company.domain,
      });
    },
  },
};
