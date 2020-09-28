/* eslint-disable */
import loopback from "@/services/loopback";
import modelObject from "@/services/lb-services";

modelObject.setModel("Minutes");

let Minutes = Object.assign(
  {},
  {
    relation: "",
    variables(Dia, DesignatedMeterId) {
      return loopback.post(
        "/Minutes/VariablesMedidorUltimaHora",
        Dia,
        DesignatedMeterId
      );
    },
    ValoresMensuales(IdMedidor) {
      return loopback.post("/Minutes/VariablesMensual", IdMedidor);
    },
    EpimpHistorialMensualActual(IdMedidor) {
      return loopback.post("/Minutes/EpimpHistorialMensualActual", IdMedidor);
    },

    DistributionPeriod(IdMedidor, periodo, id_empresa) {
      return loopback.post("/Minutes/DistributionPeriod", {
        IdMedidor: IdMedidor,
        periodo: periodo,
        id_empresa: id_empresa,
      });
    },
    BaseMediaPuntaDia(Dia, DesignatedMeterId, id_empresa) {
      return loopback.post("/Minutes/BaseMediaPuntaDia", {
        Dia: Dia,
        DesignatedMeterId: DesignatedMeterId,
        id_empresa: id_empresa,
      });
    },

    BaseMediaPuntaMes(DesignatedMeterId, id_empresa) {
      return loopback.post("/Minutes/BaseMediaPuntaMes", {
        DesignatedMeterId: DesignatedMeterId,
        id_empresa: id_empresa,
      });
    },

    DistributionPeriodDiario(DesignatedMeterId, periodo, id_empresa) {
      return loopback.post("/Minutes/DistributionPeriodDiario", {
        DesignatedMeterId: DesignatedMeterId,
        periodo: periodo,
        id_empresa: id_empresa,
      });
    },
    InyeccionPeriod(DesignatedMeterId, periodo, id_empresa) {
      return loopback.post("/Minutes/InyeccionPeriod", {
        DesignatedMeterId: DesignatedMeterId,
        periodo: periodo,
        id_empresa: id_empresa,
      });
    },

    NetCodeReadings(DesignatedMeterId, filter, variables, interval) {
      console.log(DesignatedMeterId, filter, variables, interval);
      return loopback.post("/Minutes/NetCodeReadings", {
        DesignatedMeterId: DesignatedMeterId,
        filter: filter,
        variables: variables,
        interval: interval,
      });
    },
    StandardReadings(DesignatedMeterId, filter, interval, variables) {
      console.log(DesignatedMeterId, filter, interval, variables);
      return loopback.post("/Minutes/StandardReadings", {
        DesignatedMeterId: DesignatedMeterId,
        filter: filter,
        interval: interval,
        variables: variables,
      });
    },
    ConsumptionCostFilter(DesignatedMeterId, filter, interval) {
      if (interval == 0) {
        interval = 3600;
      }
      return loopback.post("/Minutes/ConsumptionCostFilter", {
        DesignatedMeterId: DesignatedMeterId,
        filter: filter,
        interval: interval,
      });
    },

    getCarbonFootprint(DesignatedMeterId) {
      return loopback.post("/Minutes/getCarbonFootprint", {
        DesignatedMeterId: DesignatedMeterId,
      });
    },
    FootprintGraph(DesignatedMeterId, filter) {
      return loopback.post("/Minutes/FootprintGraph", {
        DesignatedMeterId: DesignatedMeterId,
        filter: filter,
      });
    },
    EficienciaDiario(DesignatedMeterId, dia) {
      return loopback.post("/Minutes/EficienciaDiario", {
        DesignatedMeterId: DesignatedMeterId,
        dia: dia,
      });
    },
  },

  modelObject
);

export default Minutes;
