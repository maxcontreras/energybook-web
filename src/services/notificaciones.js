/* eslint-disable */
import loopback from "@/services/loopback";
import modelObject from "@/services/lb-services";

modelObject.setModel("notificaciones");

let notificaciones = Object.assign(
  {},
  {
    relation: "",
    find() {
      return loopback.post(`/notificaciones`);
    },
    post(Servicios, Dispositivos, company_id, tipo, intervalo, En_Correo, Fecha, usuarios) {
      return loopback.post(`/notificaciones`, Servicios, Dispositivos, company_id, tipo, intervalo, En_Correo, Fecha, usuarios);
    },
    verNotificaciones(User_id, Company_id) {
      return loopback.post(`notificaciones/CountNotificaciones`, {
        User_id: User_id,
        Company_id: Company_id,
      });
    },
    delete(id) {
      return loopback.delete(`/notificaciones/${id}`);
    },
    Desconexion(Dispositivos, Servicios, company_id, Fecha, usuarios) {
      return loopback.post(`/notificaciones`, {
        Dispositivos,
        Servicios,
        company_id,
        Fecha,
        usuarios

      })
    }
  },
  modelObject
);

export default notificaciones;
