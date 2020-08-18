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
      return loopback.post(
        "/Minutes/DistributionPeriod",
        IdMedidor,
        periodo,
        id_empresa
      );
    },
  },
  modelObject
);

export default Minutes;
