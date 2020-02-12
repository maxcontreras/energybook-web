/* eslint-disable */
import loopback from '@/services/loopback';
import modelObject from '@/services/lb-services';

modelObject.setModel('notificaciones');

let notificaciones = Object.assign({}, {

    relation: '',
    find() {
        return loopback.post(`/notificaciones`);
    },
    verNotificaciones(User_id,Company_id){
        return loopback.post(`notificaciones/CountNotificaciones`, {
    "User_id": User_id,
    "Company_id": Company_id
});
    }
}, modelObject);

export default notificaciones;
