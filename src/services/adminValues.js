/* eslint-disable */
import modelObject from '@/services/lb-services';
import loopback from '@/services/loopback';

modelObject.setModel('AdminValue');

let adminValue = Object.assign({}, {

    relation: '',

    findByDate(ISOdate) {
        return loopback.post('/AdminValues/findByDate', {date: ISOdate});
    },

    createOrUpdatePrices(date, payload) {
        return loopback.post('/AdminValues/createOrUpdatePrices', {date, payload});
    }

}, modelObject);

export default adminValue;
