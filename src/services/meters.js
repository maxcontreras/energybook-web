/* eslint-disable */
import loopback from '@/services/loopback';
import modelObject from '@/services/lb-services';

modelObject.setModel('Meters');

let meters = Object.assign({}, {

    relation: '',

    getConsumptionCostsByFilter(id, device, service, filter, interval, custom_dates) {
        return loopback.post('Meters/getConsumptionCostsByFilter', {id, device, service, filter, interval, custom_dates});
    },

    getCo2e(id, device, service, filter, interval, custom_dates) {
        return loopback.post('Meters/co2e', {id, device, service, filter, interval, custom_dates});
    },

    getGenerationReadings(id, device, service, filter, interval, variable, custom_dates) {
        return loopback.post('Meters/generationReadings', {id, device, service, filter, interval, variable, custom_dates});
    },
    
    getNetCodeReadings(id, device, filter, variables, interval, custom_dates) {
        return loopback.post('Meters/getNetCodeReadings', {id, device, filter, variables, interval, custom_dates});
    },

    getStandardReadings(meter_id, device, service, variable, filter, interval, custom_dates) {
        return loopback.post('/Meters/standardReadings', {id: meter_id, device, service, variable, filter, interval, custom_dates});
    },

    getDeviceInfo(id) {
        return loopback.post(`/Meters/getDeviceInfo`, {id: id});
    },

    deviceVariables(id) {
        return loopback.post(`/Meters/deviceVariables`, {id: id});
    },

    getActivesAssigned(companyId) {
        return loopback.post('Meters/getActivesAssigned', {companyId: companyId});
    },

    unassignedMeters(){
        return loopback.get('Meters/unassignedMeters');
    },

    connectedDevices(id) {
        return loopback.post('/Meters/connectedDevices', id);
    },

    consumptionMaxMinValues(id) {
        return loopback.post('/Meters/consumptionMaxMinValues', id);
    },

    updateDesignatedMeter(data) {
        return loopback.post('/Meters/updateDesignatedMeter', data);
    },

}, modelObject);

export default meters;
