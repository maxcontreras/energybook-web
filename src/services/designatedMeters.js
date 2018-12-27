/* eslint-disable */
import loopback from '@/services/loopback';
import modelObject from '@/services/lb-services';

modelObject.setModel('DesignatedMeters');

let designatedMeters = Object.assign({}, {

    relation: '',

    getWeather(lat, lon) {
        return loopback.post('DesignatedMeters/getWeather', {lat, lon});
    },

    epimpHistory() {
        return loopback.post('DesignatedMeters/epimpHistory');
    },

    odometerReadings() {
        return loopback.post('DesignatedMeters/odometerReadings');
    },

    consumptionSummary() {
        return loopback.post('DesignatedMeters/consumptionSummary');
    },

    dailyReadings() {
        return loopback.post('DesignatedMeters/dailyReadings');
    },

    fpReadings() {
        return loopback.post('DesignatedMeters/fpReadings');
    },

    monthlyReadings() {
        return loopback.post('DesignatedMeters/monthlyReadings');
    }

}, modelObject);

export default designatedMeters;
