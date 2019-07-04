/* eslint-disable */

import Vue from 'vue';
import * as mutation from './mutations-types';
import defaultState from './state';
import { isBuffer } from 'util';

export default {
    [mutation.RESET](state) {
        const s = defaultState;
        Object.keys(s).forEach(key => {
            state[key] = s[key];
        });
    },
    [mutation.ADD](state, meter) {
        state.meters.push(meter);
    },
    [mutation.DELETE](state, index) {
        state.meters.splice(index, 1);
    },
    [mutation.UPDATE](state, payload) {
        const updated = state.meters.map((meter, index) => {
            if (payload.index === index) {
                return payload.meter;
            } else {
                return meter;
            }
        });
        state.meters = updated;
    },
    [mutation.DELETE_ALL](state) {
        state.meters = [];
    },
    [mutation.ADD_ASSIGNED](state, meter) {
        state.metersAssigned.push(meter);
    },
    [mutation.DELETE_ASSIGNED]() {
        state.metersAssigned.splice(index, 1);
    },
    [mutation.UPDATE_ASSIGNED](state, payload) {
        const updated = state.metersAssigned.map((meter, index) => {
            if (payload.index === index) {
                return payload.meter;
            } else {
                return meter;
            }
        });
        state.metersAssigned = updated;
    },
    [mutation.DELETE_ALL_ASSIGNED](state) {
        state.metersAssigned = [];
    },
    [mutation.GET_CFE_VALUES](state, {new_date, GDMTH, GDMTO}) {
        state.cfeValues.date = new_date;
        state.cfeValues["GDMTH"].prices.base = GDMTH.basePrice;
        state.cfeValues["GDMTH"].prices.middle = GDMTH.middlePrice;
        state.cfeValues["GDMTH"].prices.peak = GDMTH.peakPrice;    
        state.cfeValues["GDMTH"].prices.capacity = GDMTH.capacityPrice;
        state.cfeValues["GDMTH"].prices.distribution = GDMTH.distributionPrice;  
        state.cfeValues["GDMTO"].prices.ordinary = GDMTO.ordinaryPrice;        
        state.cfeValues["GDMTO"].prices.capacity = GDMTO.capacityPrice;
        state.cfeValues["GDMTO"].prices.distribution = GDMTO.distributionPrice;        
    },
    [mutation.GET_CURRENT_CFE_VALUES](state, {basePrice, middlePrice, peakPrice, capacityPrice, distributionPrice }) {
        state.cfeValues.currentPrices = {
            base: basePrice,
            middle: middlePrice,
            peak: peakPrice,
            capacity: capacityPrice,
            distribution: distributionPrice
        }
    },
    [mutation.UPDATE_METER_AVAILABLE](state, isAvailable) {
        state.isAvailable = isAvailable;
    }
};
