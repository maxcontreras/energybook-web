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

export function loadAssignedMeters({commit}, isAdmin = false) {
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
                    commit(mutation.ADD_ASSIGNED, meter);
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
