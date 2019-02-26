/* eslint-disable */
import loopback from '@/services/loopback';
import modelObject from '@/services/lb-services';

modelObject.setModel('Services');

let services = Object.assign({}, {

    relation: '',
    monthlyHistory(service, companyId, period) {
        return loopback.post('/Services/monthlyHistory', {service, companyId, period});
    }

}, modelObject);

export default services;
