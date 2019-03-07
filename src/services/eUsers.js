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
    logout() {
        return loopback.post(`/eUsers/logout`);
    },
    delete(id) {
        return loopback.delete(`/eUsers/${id}`);
    }
}, modelObject);

export default eUsers;
