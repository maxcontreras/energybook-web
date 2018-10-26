/* eslint-disable */

import meters from '@/services/meters';
import designatedMeters from '@/services/designatedMeters';
import companies from '@/services/companies'
import * as mutation from './mutations-types';

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

export function loadAssignedMeters({commit, dispatch}, isAdmin = false) {
    return new Promise((resolve, reject) => {
        let filter = {
            filter: {
                include: ['meter','company']
            }
        }
        if(!isAdmin) {
            filter.where = {
                company_id: this.companyId
            }
        }
        designatedMeters.find({filter})
            .then(meters => {
                commit(mutation.DELETE_ALL_ASSIGNED);
                meters.forEach(meter => {
                    dispatch('getOwnerCompany', meter.meter_id)
                        .then(company => {
                            meter.company_name = company.company.name;
                            meter.serial_number = company.company.meter_serial_number;
                            meter.status = company.company.meter_status ? true : false;
                            commit(mutation.ADD_ASSIGNED, meter);
                        })
                        .catch(err => {
                            reject(err);
                        })
                });
                resolve(meters);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function getOwnerCompany({}, meterId = '') {
    return new Promise((resolve, reject) => {
        meters.getOwnerCompany({meter_id: meterId})
            .then(company => {
                resolve(company);
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
