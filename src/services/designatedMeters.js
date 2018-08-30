/* eslint-disable */
import loopback from '@/services/loopback';
import modelObject from '@/services/lb-services';

modelObject.setModel('DesignatedMeters');

let designatedMeters = Object.assign({}, {

    relation: '',

}, modelObject);

export default designatedMeters;
