<template>
  <div id="graph-costs">
    <div class="date-buttons--container container-fluid">
      <b-row>
        <b-col v-show="showMeditionIntervals" md="3" class="text-left">
          <b-button
            variant="outline-dark"
            v-for="(interval, index) in meditionIntervals"
            :key="index"
            :class="{
                            'btn-success': index === currentMeditionInterval,
                            'btn-outline-success': index !== currentMeditionInterval
                            }"
            @click="changeInterval(index)"
          >{{ interval }}</b-button>
        </b-col>
        <b-col :md="showMeditionIntervals? 9:12" class="text-right">
          <div class="datepickers" v-if="showDatePicker">
            <date-picker
              placeholder="Desde"
              v-model="date_custom.from"
              @dp-change="setCustomDate"
              :config="dateConfig"
            ></date-picker>
            <date-picker
              class="mr-0"
              placeholder="Hasta"
              v-model="date_custom.until"
              @dp-change="setCustomDate"
              :config="dateConfig"
            ></date-picker>
          </div>
          <b-button
            variant="outline-dark"
            v-for="(button, index) in buttons.options"
            :key="index"
            :class="{
                            'btn-success': currentPeriod === button.value,
                            'btn-outline-success':currentPeriod !== button.value
                            }"
            @click="changePeriod(button.value)"
            :disabled="button.value === 4"
          >{{ button.text }}</b-button>
        </b-col>
      </b-row>
    </div>
    <div class="chart-container">
      <vue-highcharts v-if="!dangerAlert" :options="ColumnOptions" ref="columnCharts"></vue-highcharts>
      <b-row class="text-center" v-if="!dangerAlert">
        <b-col class="column-legends">
          <ul>
            <li v-for="(rate, index) in rate_types" :key="index" class="legend">
              <div class="square" :style="{backgroundColor: colors[rate]}"></div>
              <p class="legend-text">{{rate}}</p>
            </li>
          </ul>
        </b-col>
      </b-row>
      <b-alert
        v-else
        show
        class="margin-top-1"
        variant="danger"
      >Hubo un error al obtener los datos del medidor. ¡Refresca la página e intenta de nuevo!</b-alert>
    </div>
  </div>
</template>

<script>
import VueHighcharts from "vue2-highcharts";
import meters from "@/services/meters";
import datePicker from "vue-bootstrap-datetimepicker";
import { parseDate, parseDateTime, parseDayName } from "@/utils/dateTime";
import Minutesss from "@/services/Minutes";
const colors = {
  base: "#eddc49",
  middle: "#1dd6c0",
  peak: "#db3c1c",
  diario: "#f48c42",
  ordinary: "#1dd6c0",
};

var dataColumn = {
  chart: {
    type: "column",
  },
  title: {
    text: null,
  },
  xAxis: {
    categories: [],
  },
  yAxis: {
    title: {
      text: null,
    },
  },
  tooltip: {
    crosshairs: true,
    shared: true,
    pointFormat:
      '<span style="color:{point.color}">\u25CF</span> Costo: <b>${point.y}</b><br/>',
    valueSuffix: " MXN",
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    column: {
      groupPadding: 0,
    },
    series: {
      colorByPoint: true,
      pointPadding: 0,
      groupPadding: 0,
    },
  },
  series: [
    {
      data: [],
    },
  ],
};

export default {
  components: {
    VueHighcharts,
    datePicker,
  },

  props: {
    meterId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      date_custom: {
        from: null,
        until: null,
      },
      dateConfig: {
        format: "YYYY-MM-DD",
        useCurrent: false,
      },
      showDatePicker: false,
      ColumnOptions: dataColumn,
      plot: {
        name: "",
        data: [],
      },
      buttons: {
        selected: 0,
        options: [
          { value: -1, text: "Calendario" },
          { value: 0, text: "Hoy" },
          { value: 1, text: "Ayer" },
          { value: 2, text: "Esta Semana" },
          { value: 3, text: "Este Mes" },
        ],
      },
      currentPeriod: 0,
      dangerAlert: false,
      colors: {
        Base: "#eddc49",
        Intermedia: "#1dd6c0",
        Punta: "#db3c1c",
        Diario: "#f48c42",
        Ordinario: "#1dd6c0",
      },
      meditionIntervals: ["Cada hora", "Cada día"],
      currentMeditionInterval: 0,
      isLoading: false,
    };
  },

  watch: {
    meterId() {
      this.changeMeter();
    },
  },

  computed: {
    rate_types() {
      if (this.currentMeditionInterval === 1 && this.currentPeriod > 1) {
        return ["Diario"];
      } else if (this.company.tariff_type === "GDMTO") {
        return ["Ordinario"];
      } else {
        return ["Base", "Intermedia", "Punta"];
      }
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

    showMeditionIntervals() {
      return this.currentPeriod > 1 || this.currentPeriod === -1;
    },

    company() {
      return this.$store.state.user.company;
    },
  },

  beforeMount() {
    this.plot.name = "Costos";
  },

  methods: {
    showLoading() {
      this.isLoading = true;
      let columnCharts = this.$refs.columnCharts;
      columnCharts.delegateMethod("showLoading", "Loading...");
    },

    load() {
      let columnCharts = this.$refs.columnCharts;
      columnCharts.addSeries(this.plot);
      columnCharts.hideLoading();
      this.isLoading = false;
    },

    changeMeter() {
      if (this.dangerAlert) this.dangerAlert = false;
      setTimeout(() => {
        this.changePeriod(0);
      }, 100);
    },

    validateDates() {
      let isValid = false;
      let errorMessage = {};
      if (moment(this.date_custom.until).isBefore(this.date_custom.from)) {
        errorMessage = {
          title: "Fecha incorrecta",
          text: "La fecha de inicio no puede ser mayor a la final",
        };
      } else if (this.dayDifference > 31) {
        errorMessage = {
          title: "Periodo muy grande",
          text: "El periodo no puede exceder más de 31 días",
        };
      } else if (moment().isBefore(this.date_custom.from)) {
        errorMessage = {
          title: "Periodo inexistente",
          text: "La fecha de inicio no puede ser mayor a la actual",
        };
      } else {
        isValid = true;
      }
      return { isValid, errorMessage };
    },

    setCustomDate() {
      if (this.date_custom.from && this.date_custom.until && !this.isLoading) {
        const { isValid, errorMessage } = this.validateDates();
        if (isValid) {
          this.renderChartWithData();
        } else {
          this.$notify({
            group: "notification",
            type: "warn",
            title: errorMessage.title,
            text: errorMessage.text,
          });
        }
      }
    },

    changeInterval(interval) {
      if (this.isLoading) {
        this.$notify({
          group: "notification",
          type: "warn",
          title: "Petición en proceso",
          text: "Por favor, espera mientras los datos de la gráfica se cargan",
        });
        return;
      }
      if (interval !== null && !this.dangerAlert) {
        this.currentMeditionInterval = interval;

        this.renderChartWithData();
      }
    },

    changePeriod(period) {
      if (this.isLoading) {
        this.$notify({
          group: "notification",
          type: "warn",
          title: "Petición en proceso",
          text: "Por favor, espera mientras los datos de la gráfica se cargan",
        });
        return;
      }
      if (period !== null && !this.dangerAlert) {
        this.currentPeriod = period;

        if (period === -1) {
          this.showDatePicker = true;
          return;
        }
        this.date_custom = {
          from: null,
          until: null,
        };
        this.showDatePicker = false;

        this.renderChartWithData();
      }
    },

    renderChartWithData() {
      let chart = this.$refs.columnCharts.getChart();
      let columnCharts = this.$refs.columnCharts;

      if (!chart.renderer.forExport) {
        this.showLoading();
        columnCharts.removeSeries();
        if (this.currentPeriod !== -1 && this.currentPeriod < 2) {
          this.getData(this.currentPeriod, 0, chart);
        } else {
          this.getData(this.currentPeriod, this.currentMeditionInterval, chart);
        }
      }
    },

    getData(filter, interval, chart) {
      // aqui es bro
      const meter = this.meterId.split("*");
      let meter_id = meter[0];
      let meter_device = meter[1] === "EDS" ? "" : meter[1];
      let service = meter[1] === "EDS" ? meter[2] : "";
      console.log(this.$store.state.mode);
      console.log(
        meter_id,
        meter_device,
        service,
        filter,
        interval,
        this.date_custom
      );

      if (this.$store.state.mode == "ACUVIM") {
        Minutesss.ConsumptionCostFilter(meter[1], filter, interval).then(
          (res) => {
            if (res) {
              console.log(res);
              let data = [];
              let tickInterval;
              let xAxis = res.response.map((item) => {
                let time = parseDateTime(item.date);
                data.push(
                  this.formatData(
                    item.date,
                    item.cost,
                    item.rate,
                    item.rateCosts
                  )
                );
                let result = this.formatxAxis(item.date);
                tickInterval = result.tickInterval;
                return result.res;
              });
              let plotOptions = this.formatPlotOptions(
                this.currentPeriod,
                res.response.length
              );
              let tooltip = this.formatTooltip(
                this.currentMeditionInterval,
                this.currentPeriod
              );

              chart.update({
                xAxis: { categories: xAxis, tickInterval },
                plotOptions: plotOptions,
                tooltip,
              });
              this.updateSeries(data);
            }
          }
        );
      } else {
        meters
          .getConsumptionCostsByFilter(
            meter_id,
            meter_device,
            service,
            filter,
            interval,
            this.date_custom
          )
          .then((res) => {
            if (res) {
              console.log(res);
              let data = [];
              let tickInterval;
              let xAxis = res.map((item) => {
                let time = parseDateTime(item.date);
                data.push(
                  this.formatData(
                    item.date,
                    item.cost,
                    item.rate,
                    item.rateCosts
                  )
                );
                let result = this.formatxAxis(item.date);
                tickInterval = result.tickInterval;
                return result.res;
              });
              let plotOptions = this.formatPlotOptions(
                this.currentPeriod,
                res.length
              );
              let tooltip = this.formatTooltip(
                this.currentMeditionInterval,
                this.currentPeriod
              );

              chart.update({
                xAxis: { categories: xAxis, tickInterval },
                plotOptions: plotOptions,
                tooltip,
              });
              this.updateSeries(data);
            }
          })
          .catch((err) => {
            console.log(err);
            this.dangerAlert = true;
            this.load();
          });
      }
    },

    updateSeries(data) {
      this.plot.data = data;
      this.load();
    },

    formatTooltip(interval, period) {
      if (
        interval === 1 &&
        period > 1 &&
        this.company.tariff_type === "GDMTH"
      ) {
        return {
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> Costo Total: <b>${point.y}</b><br>\
                        <span style="color:{point.colors.base}">\u25CF</span> Base: <b>$ {point.rateCosts.base}</b><br>\
                        <span style="color:{point.colors.middle}">\u25CF</span> Media: <b>$ {point.rateCosts.middle}</b><br>\
                        <span style="color:{point.colors.peak}">\u25CF</span> Punta: <b>$ {point.rateCosts.peak}</b><br>',
        };
      } else {
        return {
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> Costo: <b>${point.y}</b><br/>',
        };
      }
    },

    formatPlotOptions(period, numberResults) {
      if (period > 1 && numberResults >= 20) {
        return {
          series: {
            pointPadding: 0,
            groupPadding: 0,
          },
        };
      } else {
        return {
          series: {
            pointPadding: 0.05,
            groupPadding: 0.05,
          },
        };
      }
    },

    formatxAxis(date) {
      let time = parseDateTime(date);
      let day = parseDayName(date);
      let tickInterval = 1;
      if (
        this.currentMeditionInterval === 1 &&
        (this.currentPeriod > 1 || this.currentPeriod === -1)
      ) {
        return { res: `${day} ${date.substring(0, 2)}`, tickInterval };
      }
      if (this.currentPeriod === -1) {
        tickInterval = 24;
        return { res: `${day} ${date.substring(0, 2)}`, tickInterval };
      }
      if (this.currentPeriod < 2) {
        return { res: time, tickInterval };
      } else if (this.currentPeriod === 2) {
        tickInterval = 6;
        return { res: `${day} ${time}`, tickInterval };
      } else if (this.currentPeriod === 3) {
        tickInterval = 12;
        if (time === "00:00:00") {
          return { res: `${day} ${date.substring(0, 2)}`, tickInterval };
        } else {
          return { res: `${time}`, tickInterval };
        }
      }
    },

    formatData(date, cost, rate, rateCosts) {
      let time = parseDateTime(date);
      let day = parseDayName(date);
      let dat = parseDate(date);
      if (this.currentMeditionInterval === 1 && this.currentPeriod === 2) {
        return {
          name: `${rate} - ${day} ${date.substring(0, 2)}`,
          y: parseFloat(cost.toFixed(2)),
          color: colors[rate],
          rateCosts,
          colors,
        };
      } else if (
        this.currentMeditionInterval === 1 &&
        this.currentPeriod === 3
      ) {
        return {
          name: `${rate} - ${dat}`,
          y: parseFloat(cost.toFixed(2)),
          color: colors[rate],
          rateCosts,
          colors,
        };
      }
      if (this.currentPeriod === 2) {
        return {
          name: `${rate} - ${day} ${time}`,
          y: parseFloat(cost.toFixed(2)),
          color: colors[rate],
        };
      } else if (this.currentPeriod === 3) {
        return {
          name: `${rate} - ${dat} ${time}`,
          y: parseFloat(cost.toFixed(2)),
          color: colors[rate],
        };
      } else {
        return {
          name: `${rate} - ${time}`,
          y: parseFloat(cost.toFixed(2)),
          color: colors[rate],
        };
      }
    },
  },
};
</script>
