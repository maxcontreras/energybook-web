/* eslint-disable */
import modelObject from "@/services/lb-services";
import loopback from "@/services/loopback";

modelObject.setModel("eficiencia");

let eficiencia = Object.assign(
  {},
  {
    relation: "",
    eficiency() {
      return loopback.get(`/eficiencia`);
    },
    guardar(UserId, Dia, valor, id) {
      return loopback.put("/eficiencia", { UserId, Dia, valor, id });
    }
  },
  modelObject
);

export default eficiencia;
