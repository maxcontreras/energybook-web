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
    }

}, modelObject);

export default companies;
