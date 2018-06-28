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
    logout(data) {
        return loopback.post(`/eUsers/logout`, data);
    }

}, modelObject);

export default eUsers;
