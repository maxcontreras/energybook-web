/* eslint-disable */
import loopback from '@/services/loopback';
import modelObject from '@/services/lb-services';

modelObject.setModel('DesignatedMeters');

let designatedMeters = Object.assign({}, {

    relation: '',

    getWeather(lat, lon) {
        return loopback.post('DesignatedMeters/getWeather', {lat, lon});
    },

    epimpHistory(company_id) {
        return loopback.post('DesignatedMeters/epimpHistory', {company_id});
    },

    odometerReadings(company_id) {
        return loopback.post('DesignatedMeters/odometerReadings', {company_id});
    },

    consumptionSummary(company_id) {
        return loopback.post('DesignatedMeters/consumptionSummary', {company_id});
    },

    dailyReadings(company_id) {
        return loopback.post('DesignatedMeters/dailyReadings', {company_id});
    },

    fpReadings(company_id) {
        return loopback.post('DesignatedMeters/fpReadings', {company_id});
    },

    monthlyReadings(company_id) {
        return loopback.post('DesignatedMeters/monthlyReadings', {company_id});
    },

    setDeviceDescriptions() {
        return loopback.post('DesignatedMeters/setDeviceDescriptions');
    }

}, modelObject);

export default designatedMeters;
