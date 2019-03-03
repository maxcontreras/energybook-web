/* eslint-disable */

import meters from '@/services/meters';
import designatedMeters from '@/services/designatedMeters';
import adminValues from '@/services/adminValues';
import companies from '@/services/companies'
import * as mutation from './mutations-types';
import moment from 'moment';
import _l from 'lodash';

export function loadUnassignedMeters({commit}, userId) {
    return new Promise((resolve, reject) => {
        meters.unassignedMeters()
            .then(res => {
                if(res && res.meters) {
                    commit(mutation.DELETE_ALL);
                    res.meters.forEach(meter => {
                        commit(mutation.ADD, meter);
                    });
                    resolve(res.meters);
                } else {
                    reject();
                }
            })
            .catch(err =>  {
                reject(err);
            })
    });
}

export function loadAssignedMeters({commit}, isAdmin = false) {
    return new Promise((resolve, reject) => {
        let filter = {
            include: ['meter','company']
        }
        if(!isAdmin) {
            filter.where = {
                company_id: this.companyId
            }
        }
        designatedMeters.find({filter})
            .then(meters => {
                commit(mutation.DELETE_ALL_ASSIGNED);
                console.log(meters)
                meters.forEach(meter => {
                    meter.company_name = meter.company.company_name;
                    meter.serial_number = meter.meter.serial_number;
                    meter.status = meter.company.status ? true : false;
                    delete meter.company;
                    delete meter.meter;
                    commit(mutation.ADD_ASSIGNED, meter);
                });
                resolve(meters);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function createMeter({commit}, meter) {
    return new Promise((resolve, reject) => {
        meters.create({data: meter})
            .then(meter => {
                commit(mutation.ADD, meter);
                resolve(meter);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function assignMeter({commit, dispatch, state}, meter) {
    return new Promise((resolve, reject) => {
        companies.designateMeter({data: meter})
            .then(res => {
                const index = state.meters.findIndex(_ => _.id === meter.id)
                commit(mutation.DELETE, index);
                if (res) {
                    dispatch('getAssigned', meter.meter_id)
                        .then(res => {
                            const assigned = res.meters;
                            const meter = assigned[assigned.length - 1];
                            meter.company_name = meter.company.company_name;
                            meter.serial_number = meter.meter.serial_number;
                            meter.status = meter.company.status ? true : false;
                            commit(mutation.ADD_ASSIGNED, meter);
                            resolve(meter);
                        })
                        .catch(err => {
                            reject(err);
                        });
                } else {
                    reject();
                }
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function getAssigned({}, meterId = '') {
    return new Promise((resolve, reject) => {
        meters.getAssigned({id: meterId})
            .then(res => {
                resolve(res);
            })
            .catch(err =>  {
                reject(err);
            })
    });
}

export function editAssignedMeter({commit, state}, meter) {
    return new Promise((resolve, reject) => {
        meters.updateDesignatedMeter({data: meter})
            .then(res => {
                const index = state.metersAssigned.findIndex(_ => _.id === meter.id);
                commit(mutation.UPDATE_ASSIGNED, {index, meter});
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function deleteMeter({commit, state}, index, meter) {
    return new Promise((resolve, reject) => {
        // TODO make a api request
        commit(mutation.DELETE, index);
        resolve();
    });
}

export function getCurrentCfePeriod({commit, state}, city) {
    adminValues.findByDate(state.cfeValues.currentDate, city)
        .then(({cfeValue}) => {
            commit(mutation.GET_CURRENT_CFE_VALUES, Object.assign({}, cfeValue));
        })
        .catch(err => {
            console.log(err);
        });
}

export function changeCfePeriod({commit, state}, {date, city}) {
    let new_date = moment(state.cfeValues.date).add(date.years, 'Y').add(date.months, 'M').format();
    adminValues.findByDate(new_date, city.text)
        .then(({cfeValue}) => {
            state.cfeValues.citySelected = city.value;
            commit(mutation.GET_CFE_VALUES, Object.assign({new_date}, cfeValue));
        })
        .catch(err => {
            console.log(err);
        });
}

export function setCfePrices({commit, state}, {payload, city}) {
    return new Promise((resolve, reject) => {
        adminValues.createOrUpdatePrices(state.cfeValues.date, city, payload)
            .then(({cfeValue}) => {
                commit(mutation.GET_CFE_VALUES, Object.assign({new_date: cfeValue.date}, cfeValue));
                resolve();
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}
