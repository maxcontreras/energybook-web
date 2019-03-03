/* eslint-disable */
import modelObject from '@/services/lb-services';
import loopback from '@/services/loopback';

modelObject.setModel('Companies');

let companies = Object.assign({}, {

    relation: '',

    register(data) {
        return loopback.post(`/Companies/register`, data);
    },

    addUsers(data) {
        return loopback.post(`/Companies/addUsers`, data);
    },

    addUser(companyId, user) {
        return loopback.post(`/Companies/addUser`, {companyId, user});
    },

    designateMeter(data) {
        return loopback.post(`/Companies/designateMeter`, data);
    },

}, modelObject);

export default companies;
