/* eslint-disable */
import designatedMeters from "@/services/designatedMeters";
import datePicker from "vue-bootstrap-datetimepicker";
import VSeries from "@/app/components/chart/VSeries";
import meters from "@/services/meters";
import axisParser from "@/mixins/axisParser";
import notify from "@/mixins/notify";
import datesValidator from "@/mixins/datesValidator";
import Minutesss from "@/services/Minutes";

const warnTitle = "Petición en proceso";
const warnText = "Por favor, espera mientras los datos de la gráfica se cargan";

export default {
  props: ["companyIdProp"],

  mixins: [axisParser, notify("notification"), datesValidator],

  components: {
    datePicker,
    VSeries,
  },

  data() {
    return {
      unidades: "",
      fechas: "",
      promedio: "",
      minimo: "",
      maximo: "",
      array: [],
      metersFilter: {
        selected: "",
        options: [],
      },
      date_custom: {
        from: null,
        until: null,
      },
      dateConfig: {
        format: "YYYY-MM-DD",
        useCurrent: false,
      },
      dangerAlert: false,
      showDatePicker: false,
      eds: [],
      graphPeriod: {
        selected: 0,
        options: [
          { value: -1, text: "Calendario" },
          { value: 0, text: "Hoy" },
          { value: 1, text: "Ayer" },
          { value: 2, text: "Esta Semana" },
          { value: 3, text: "Este Mes" },
        ],
      },
      graphType: {
        selected: 0,
        options: [
          { variables: ["DP"], name: "Demanda" },
          { variables: ["EPimp"], name: "Consumo" },
        ],
      },
      graphInterval: {
        selected: 900,
        options: [
          { text: "1 hora", value: 3600 },
          { text: "30 minutos", value: 1800 },
          { text: "15 minutos", value: 900 },
          { text: "5 minutos", value: 300 },
        ],
      },
    };
  },

  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    companyId() {
      if (this.isAdmin) return this.companyIdProp;
      return this.$store.state.company_id;
    },
    isCosts() {
      return this.$route.name === "costs";
    },
    title() {
      return this.isCosts ? "Costos" : "Gráficas";
    },
    meterSelected() {
      return this.metersFilter.selected;
    },
    currentChart() {
      return this.$refs.seriesChart;
    },
    currentVariableNameSelected() {
      const selected = this.graphType.selected;
      return this.graphType.options[selected].name;
    },
    currentVariableSelected() {
      const selected = this.graphType.selected;
      return this.graphType.options[selected].variables[0];
    },
    shouldShowIntervals() {
      return this.currentVariableNameSelected !== "Demanda";
    },
    dayDifference() {
      if (this.date_custom.until && this.date_custom.from) {
        return moment(this.date_custom.until).diff(
          moment(this.date_custom.from),
          "days"
        );
      }
      return 0;
    },
  },

  watch: {
    companyId() {
      this.getMeters();
    },
    meterSelected() {
      this.showDatePicker = false;
      if (this.dangerAlert) this.dangerAlert = false;
      setTimeout(() => {
        this.changePeriod(0);
      }, 100);
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
          if (eds.length > 0) {
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
          }
        });
    },
    setCustomDate() {
      if (
        this.date_custom.from &&
        this.date_custom.until &&
        !this.currentChart.isLoading
      ) {
        const { isValid, errorMessage } = this.validateDates(
          this.date_custom.from,
          this.date_custom.until,
          this.dayDifference
        );
        if (isValid) {
          this.renderChartWithNewData();
        } else {
          this.notify(errorMessage.title, errorMessage.text, "warn");
        }
      }
    },
    changeType(new_type) {
      if (this.currentChart.isLoading) {
        this.notify(warnTitle, warnText, "warn");
      } else if (new_type !== null && !this.dangerAlert) {
        this.graphType.selected = new_type;
        this.graphPeriod.selected = 0;
        this.resetOptionsData();
        this.renderChartWithNewData();
      }
    },
    changePeriod(new_period) {
      if (this.currentChart.isLoading) {
        this.notify(warnTitle, warnText, "warn");
      } else if (new_period !== null && !this.dangerAlert) {
        this.graphPeriod.selected = new_period;
        if (new_period === -1) return (this.showDatePicker = true);
        this.resetOptionsData();
        this.renderChartWithNewData();
      }
    },
    changeInterval(new_interval) {
      if (this.currentChart.isLoading) {
        this.notify(warnTitle, warnText, "warn");
      } else if (new_interval !== null && !this.dangerAlert) {
        this.graphInterval.selected = new_interval;
        this.renderChartWithNewData();
      }
    },
    resetOptionsData() {
      this.date_custom = {
        from: null,
        until: null,
      };
      this.showDatePicker = false;
      if (this.currentVariableNameSelected === "Demanda") {
        this.graphInterval.selected = 900;
      } else {
        this.graphInterval.selected = 3600;
      }
    },
    renderChartWithNewData() {
      this.currentChart
        .renderChartWithData()
        .then(() => {
          this.getData();
        })
        .catch(() => {
          console.log("Could not load new data");
          this.dangerAlert = true;
        });
    },
    getData() {
      const meter = this.metersFilter.selected.split("*");
      console.log(meter);
      const meter_id = meter[0];
      const meter_device = meter[1] === "EDS" ? "" : meter[1];
      const service = meter[1] === "EDS" ? meter[2] : "";

      if (this.$store.state.mode == "ACUVIM") {
        console.log("HOLA SOY ACUVIM");
        console.log(
          this.graphType.options[this.graphType.selected].variables[0]
        );
        Minutesss.StandardReadings(
          meter[1],
          this.graphPeriod.selected,
          this.graphInterval.selected,
          this.graphType.options[this.graphType.selected].variables[0]
        ).then((res) => {
          console.log(res);

          this.array = [];
          res.response.forEach((value) => {
            this.array.push(value.value);
          });
          var primerdia = res.response[0];
          var ultimodia = res.response.pop();

          var arrayprimerdia = primerdia.date.match(/.{1,2}/g);
          var arrayultimodia = ultimodia.date.match(/.{1,2}/g);

          this.fechas =
            String(arrayprimerdia[0]) +
            "-" +
            String(arrayprimerdia[1]) +
            "-" +
            String(arrayprimerdia[2]) +
            String(arrayprimerdia[3]) +
            " a " +
            String(arrayultimodia[0]) +
            "-" +
            String(arrayultimodia[1]) +
            "-" +
            String(arrayultimodia[2]) +
            String(arrayultimodia[3]);

          if (this.graphType.selected == 1) {
            // consumo

            this.unidades = " kWh";
          }
          if (this.graphType.selected == 0) {
            // Demanada

            this.unidades = " kW";
          }

          this.maximo = String(Math.max(...this.array));
          this.minimo = String(Math.min(...this.array));
          this.promedio =
            String(
              (this.array.reduce((a, b) => a + b, 0) / this.array.length)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            ) + " kWh";

          let { xAxis, tickInterval, data, zones } = this.parseMeterValues(
            res.response
          );
          const update_data = {
            xAxis: {
              categories: xAxis,
              tickInterval,
              tickmarkPlacement: "on",
            },
          };
          const series = [
            {
              data,
              zones,
              name: this.currentVariableNameSelected,
              color: "#2f7ed8",
            },
          ];
          this.currentChart.updateChart(update_data);
          this.currentChart.updateSeries(series);
        });
      } else {
        meters
          .getStandardReadings(
            meter_id,
            meter_device,
            service,
            this.currentVariableSelected,
            this.graphPeriod.selected,
            this.graphInterval.selected,
            this.date_custom
          )
          .then((res) => {
            if (res) {
              console.log(res);
              if (res == "") {
                console.log(res);
                this.notify(
                  "Problema al intentar sacar informacion del meter",
                  "Accediendo a la base de datos en busca de valores",
                  "warn"
                );

                this.graphPeriod = {
                  selected: 1,
                  options: [{ value: 1, text: "Ayer" }],
                };
              } else {
                this.array = [];
                res.forEach((value) => {
                  this.array.push(value.value);
                });
                var primerdia = res[0];
                var ultimodia = res.pop();

                var arrayprimerdia = primerdia.date.match(/.{1,2}/g);
                var arrayultimodia = ultimodia.date.match(/.{1,2}/g);

                this.fechas =
                  String(arrayprimerdia[0]) +
                  "-" +
                  String(arrayprimerdia[1]) +
                  "-" +
                  String(arrayprimerdia[2]) +
                  String(arrayprimerdia[3]) +
                  " a " +
                  String(arrayultimodia[0]) +
                  "-" +
                  String(arrayultimodia[1]) +
                  "-" +
                  String(arrayultimodia[2]) +
                  String(arrayultimodia[3]);

                if (this.graphType.selected == 1) {
                  // consumo

                  this.unidades = " kWh";
                }
                if (this.graphType.selected == 0) {
                  // Demanada

                  this.unidades = " kW";
                }

                this.maximo = String(Math.max(...this.array));
                this.minimo = String(Math.min(...this.array));
                this.promedio =
                  String(
                    (this.array.reduce((a, b) => a + b, 0) / this.array.length)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  ) + " kWh";

                let {
                  xAxis,
                  tickInterval,
                  data,
                  zones,
                } = this.parseMeterValues(res);
                const update_data = {
                  xAxis: {
                    categories: xAxis,
                    tickInterval,
                    tickmarkPlacement: "on",
                  },
                };
                const series = [
                  {
                    data,
                    zones,
                    name: this.currentVariableNameSelected,
                    color: "#2f7ed8",
                  },
                ];
                console.log(zones);
                this.currentChart.updateChart(update_data);
                this.currentChart.updateSeries(series);
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.dangerAlert = true;
            this.currentChart.load();
          });
      }
    },
    parseMeterValues(values) {
      const dates = [];
      const zones = [];
      let currVal = 0;
      let isPeak = false;

      let data = values.map((reading) => {
        if (reading.isPeak !== undefined && reading.isPeak !== isPeak) {
          zones.push({
            value: currVal,
            color: reading.isPeak ? "#2f7ed8" : "#ce1616",
          });
        }
        currVal++;
        isPeak = reading.isPeak;

        dates.push(reading.date);
        return reading.value;
      });
      let { xAxis, tickInterval } = this.parseXAxis(
        dates,
        this.graphPeriod.selected,
        this.dayDifference,
        this.graphInterval.selected
      );
      return { data, xAxis, tickInterval, zones };
    },
  },
};
