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
    },
    ProduccionMes(UserId, MesyAno) {
      return loopback.post("/eficiencia/ProduccionUsuarioMensual", {
        UserId,
        MesyAno
      });
    }
  },
  modelObject
);

export default eficiencia;
