/* eslint-disable */
import loopback from '@/services/loopback';
import modelObject from '@/services/lb-services';

modelObject.setModel('eUsers');

let eUsers = Object.assign({}, {

    relation: '',

    getCurrentId(){
        return JSON.parse(localStorage.getItem('loopback-token')).userId;
    },
    login(data) {
        return loopback.post(`/eUsers/login`, data);
    },
    getTrialDaysLeft(id) {
        return loopback.get(`/eUsers/trialDaysLeft`,{ params: { id } });
    },
    logout() {
        return loopback.post(`/eUsers/logout`);
    },
    delete(id) {
        return loopback.delete(`/eUsers/${id}`);
    },
    PATCH(IdUser,data){
        return loopback.patch(`/eUsers/${IdUser}`, data);
    },
    resetPassword(userId) {
        return loopback.post('/eUsers/resetPassword', {userId});
    }
}, modelObject);

export default eUsers;
