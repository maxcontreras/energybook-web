/* eslint-disable */
import loopback from '@/services/loopback';
import modelObject from '@/services/lb-services';

modelObject.setModel('DesignatedMeters');

let designatedMeters = Object.assign({}, {

    relation: '',

    getWeather(lat, lon) {
        return loopback.post('DesignatedMeters/getWeather', {lat, lon});
    }

}, modelObject);

export default designatedMeters;
