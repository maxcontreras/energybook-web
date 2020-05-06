/* eslint-disable */
import VHeader from "@/app/components/VHeader.vue";
import companies from "@/services/companies";
import VTable from "@/app/components/VTable.vue";
import { gmapApi } from "vue2-google-maps";
import { uncompensateScroll } from "fullcalendar";
import users from "@/services/eUsers";
import adminValues from "@/services/adminValues.js";
import VColumnscfe from "@/app/components/chart/VColumnscfe.vue";
import VueHighcharts from "vue2-highcharts";

var dataColumn = {
  chart: {
    type: "spline",
  },
  title: {
    text: "Preiodo CFE",
  },
  xAxis: {
    categories: ["aqui", "van", "los", "dias"],
  },
  yAxis: {
    title: {
      text: "Holawe",
    },
  },
  tooltip: {
    crosshairs: true,
    shared: true,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    spline: {
      marker: {
        enabled: false,
      },
    },
  },
  series: [],

};
export default {
  components: {
    VHeader,
    VTable,
    VColumnscfe,
    VueHighcharts,
  },

  computed: {
    google: gmapApi,
    cfePrices() {
      return this.$store.getters["meter/getCfePrices"];
    },
  },

  watch: {
    selected: function (val, oldVal) {


      var ok = { data: [1, 2, 3, 4, 5], name: "holawe", color: "#2f7ed8", zoneAxis: 'x', zones: 0 }

      this.chartOptions.series.push(ok);


      console.log(this.chartOptions);
      console.log("ya entre ");
      adminValues
        .get({
          filter: {
            where: {
              city: this.selected,
            },
          },
        })
        .then((res) => {
          this.datos = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    companies(newValue, oldValue) {
      if (newValue.length !== oldValue) {
        newValue.forEach((company, index) => {
          if (company.location && this.google) {
            this.setMarkers(company.location, index, company.company_name);
          }
        });
      }
    },
    google(newVal) {
      if (newVal) {
        this.companies.forEach((company, index) => {
          if (company.location) {
            this.setMarkers(company.location, index, company.company_name);
          }
        });
      }
    },
  },

  beforeMount() {
    var bandera = 0;
    companies
      .find({
        filter: {
          where: { administra: true },
        },
      })
      .then((res) => {
        let companiesArr = res;
        this.companies = res;
        companiesArr.forEach((company, index) => {
          var empresasAdministradas = company.Administrando;

          empresasAdministradas.forEach((empresaAdministrada) => {
            companies
              .find({
                filter: {
                  where: {
                    id: empresaAdministrada,
                  },
                },
              })
              .then((empresa, index) => {
                this.items.push({
                  Nombre: empresa[0].company_name,
                  Administrador: company.company_name + " (Admin)",
                  "Fecha de Registro": moment(empresa[0].created_at).format(
                    "LL"
                  ),
                });
                if (empresa[0].location && this.google) {
                  this.setMarkers(
                    empresa[0].location,
                    index,
                    empresa[0].company_name
                  );
                }
              });
          });
        });
      })
      .catch((err) => {
        console.log("error al traer compañias", err);
      });
  },

  data() {
    return {
      chartOptions: dataColumn,
      datos: [],
      selected: null,
      options: [
        { value: null, text: "Selecciona una ciudad" },
        { value: "Zamora Michoacán", text: "Zamora Michoacán" },
        { value: "Jacona Michoacán", text: "Jacona Michoacán" },
        { value: "Purepero Michoacán", text: "Purepero Michoacán" },
        { value: "Ciudad Guzmán", text: "Ciudad Guzmán" },
      ],
      companies: [],
      items: [],
      fields: [
        { key: "Nombre", sortable: true },
        "Administrador",
        "Fecha de Registro",
      ],
      markers: [],
      infoWinOpen: false,
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      infoContent: "",
      currMarkerIdx: null,
    };
  },

  methods: {
    setMarkers(location, index, companyName) {
      this.markers.push({
        companyName: companyName,
        companyIndex: index,
        position: {
          lat: location.lat,
          lng: location.lon,
        },
        icon: {
          size: new this.google.maps.Size(40, 80),
          scaledSize: new this.google.maps.Size(40, 80),
          url: "/assets/images/marker.svg",
        },
      });
    },
    showInfo(marker, index) {
      if (index !== this.currMarkerIdx) {
        this.currMarkerIdx = index;
        this.infoWinOpen = true;
        this.infoWindowPos = marker.position;
        this.infoContent = `<html>
                    <body>
                        <h5>${marker.companyName}</h5>
                    </body>
                </html>`;
      } else {
        this.infoWinOpen = false;
        this.currMarkerIdx = null;
      }
    },
  },
};
