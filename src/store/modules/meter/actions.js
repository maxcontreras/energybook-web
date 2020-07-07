/* eslint-disable */

import meters from '@/services/meters';
import designatedMeters from '@/services/designatedMeters';
import adminValues from '@/services/adminValues';
import companies from '@/services/companies';
import moment from 'moment';

import _l from 'lodash';

import * as mutation from './mutations-types';

export function loadAssignedMeters({ commit }, isAdmin = false) {
    return new Promise((resolve, reject) => {
        let filter = {
            include: ['meter', 'company', 'services']
        }
        if (!isAdmin) {
            filter.where = {
                company_id: this.companyId
            }
        }
        designatedMeters.find({ filter })
            .then(meters => {
                commit(mutation.DELETE_ALL_ASSIGNED);
                meters.forEach(meter => {
                    meter.company_name = meter.company.company_name;
                    meter.serial_number = meter.meter.serial_number;
                    meter.status = meter.company.status ? true : false;
                    delete meter.company;
                    delete meter.meter;
                    commit(mutation.ADD_ASSIGNED, meter);
                });
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function LOADINGMETERS({ commit }, { isAdmin = false, administrando }) {

    return new Promise((resolve, reject) => {
        let filter = {
            include: ['meter', 'company', 'services']
        }
        if (!isAdmin) {
            filter.where = {
                company_id: this.companyId
            }
        }
        designatedMeters.find({ filter })
            .then(meters => {
                commit(mutation.DELETE_ALL_ASSIGNED);
                meters.forEach(meter => {
                    administrando.forEach(company_id => {
                        if (company_id == meter.company_id) {
                            meter.company_name = meter.company.company_name;
                            meter.serial_number = meter.meter.serial_number;
                            meter.status = meter.company.status ? true : false;
                        if(meter.active ==1){
                            meter.status = true;
                        }
                        if(meter.active == 0){
                            meter.status = false;
                        }
                            delete meter.company;
                            delete meter.meter;
                            commit(mutation.ADD_ASSIGNED, meter);
                        }

                    });


                });
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function createMeter({ dispatch }, meter) {
    return new Promise((resolve, reject) => {
        console.log(meter)
        companies.addDesignatedMeter({ data: meter })
            .then(() => {
                console.log(meter)
                dispatch('loadAssignedMeters', true);
                resolve();
            })
            .catch(err => {
                console.log(err);
                reject();
            });
    });
}

export function editAssignedMeter({ commit, state }, { meter, services, generation }) {
    return new Promise((resolve, reject) => {
        meters.updateDesignatedMeter({ meter, services, generation })
            .then(res => {
                meter.services = res;
                meter.generationDevices = generation;
                const index = state.metersAssigned.findIndex(_ => _.id === meter.id);
                commit(mutation.UPDATE_ASSIGNED, { index, meter });
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function getCurrentCfePeriod({ commit, state }, company) {
    console.log(company)

    adminValues.findByDate(state.cfeValues.currentDate, company.Division)
        .then(({ cfeValue }) => {
            commit(mutation.GET_CURRENT_CFE_VALUES, Object.assign({}, cfeValue[company.tariff_type]));
        })
        .catch(err => {
            console.log(err);
        });
}

export function changeCfePeriod({ commit, state }, { date, division }) {
    let new_date = moment(state.cfeValues.date).add(date.years, 'Y').add(date.months, 'M').format();
    adminValues.findByDate(new_date, division.text)
        .then(({ cfeValue }) => {
            console.log(cfeValue)
            state.cfeValues.citySelected = division.value;
            commit(mutation.GET_CFE_VALUES, Object.assign({ new_date }, cfeValue));
        })
        .catch(err => {
            console.log(err);
        });
}

export function setCfePrices({ commit, state }, { payload, city, tariffType }) {


    return new Promise((resolve, reject) => {
        adminValues.createOrUpdatePrices(state.cfeValues.date, city, payload, tariffType)
            .then(({ cfeValue }) => {
                console.log("entre x2")
                console.log(cfeValue)
                commit(mutation.GET_CFE_VALUES, Object.assign({ new_date: cfeValue.date }, cfeValue, { tariff_type: tariffType }));
                resolve();
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

export function setMeterAvailability({ commit }, isAvailable) {
    commit(mutation.UPDATE_METER_AVAILABLE, isAvailable);
}
