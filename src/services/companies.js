/* eslint-disable */
import modelObject from '@/services/lb-services';
import loopback from '@/services/loopback';

modelObject.setModel('Companies');

let companies = Object.assign({}, {

    relation: '',

    register(data) {
        return loopback.post(`/Companies/register`, data);
    }

}, modelObject);

export default companies;
