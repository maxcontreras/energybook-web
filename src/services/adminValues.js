/* eslint-disable */
import modelObject from '@/services/lb-services';
import loopback from '@/services/loopback';

modelObject.setModel('AdminValue');

let adminValue = Object.assign({}, {

    relation: '',

    findByDate(ISOdate, city) {
        return loopback.post('/AdminValues/findByDate', {date: ISOdate, city});
    },

    createOrUpdatePrices(date, city, payload, tariffType) {
        return loopback.post('/AdminValues/createOrUpdatePrices', {date, city, payload, tariffType});
    }

}, modelObject);

export default adminValue;
