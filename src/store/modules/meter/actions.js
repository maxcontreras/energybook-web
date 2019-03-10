/* eslint-disable */

import meters from '@/services/meters';
import designatedMeters from '@/services/designatedMeters';
import adminValues from '@/services/adminValues';
import companies from '@/services/companies'
import * as mutation from './mutations-types';
import moment from 'moment';
import _l from 'lodash';

export function loadAssignedMeters({commit}, isAdmin = false) {
    return new Promise((resolve, reject) => {
        let filter = {
            include: ['meter','company', 'services']
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

export function createMeter({dispatch}, meter) {
    return new Promise((resolve, reject) => {
        companies.addDesignatedMeter({data: meter})
            .then(() => {
                dispatch('loadAssignedMeters', true);
                resolve();
            })
            .catch(err => {
                console.log(err);
                reject();
            });
    });
}

export function editAssignedMeter({commit, state}, {meter, services}) {
    return new Promise((resolve, reject) => {
        meters.updateDesignatedMeter({meter, services})
            .then(res => {
                meter.services = res;
                const index = state.metersAssigned.findIndex(_ => _.id === meter.id);
                commit(mutation.UPDATE_ASSIGNED, {index, meter});
                resolve();
            })
            .catch(err => {
                reject(err);
            });
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

export function setMeterAvailability({commit}, isAvailable) {
    commit(mutation.UPDATE_METER_AVAILABLE, isAvailable);
}
