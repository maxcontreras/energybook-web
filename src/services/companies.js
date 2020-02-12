/* eslint-disable */
import modelObject from '@/services/lb-services';
import loopback from '@/services/loopback';

modelObject.setModel('Companies');

let companies = Object.assign({}, {

    relation: '',

    register(contactData, user) {
        return loopback.post(`/Companies/register`, { contactData, user });
    },
    PATCH(IdUser,data){
        return loopback.patch(`/Companies/${IdUser}`, data);
    },
    addUsers(data) {
        return loopback.post(`/Companies/addUsers`, data);
    },
    addAdmins(data) {
        return loopback.post(`/Companies/addAdmins`, data);
    },
    delete(id) {
        return loopback.delete(`/Companies/${id}`);
    },

    addUser(companyId, user) {
        return loopback.post(`/Companies/addUser`, {companyId, user});
    },

    addDesignatedMeter(data) {
        return loopback.post(`/Companies/addDesignatedMeter`, data);
    },
    updateData(data){
        return loopback.post(`/Companies/updateData`, data);
    }

}, modelObject);

export default companies;
