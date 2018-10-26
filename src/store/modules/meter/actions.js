/* eslint-disable */

import meters from '@/services/meters';
import designatedMeters from '@/services/designatedMeters';
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
