/* eslint-disable */

import Vue from 'vue';
import * as mutation from './mutations-types';
import defaultState from './state';

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
    [mutation.GET_CFE_VALUES](state, {new_date}) {
        state.cfeValues.date = new_date;
    }
};
