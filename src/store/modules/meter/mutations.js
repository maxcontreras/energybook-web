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
    [mutation.DELETE]() {

    },
    [mutation.UPDATE]() {

    },
    [mutation.DELETE_ALL](state) {
        state.meters = [];
    },
    [mutation.ADD_ASSIGNED](state, meter) {
        state.metersAssigned.push(meter);
    },
    [mutation.DELETE_ASSIGNED]() {

    },
    [mutation.UPDATE_ASSIGNED]() {

    },
    [mutation.DELETE_ALL_ASSIGNED](state) {
        state.metersAssigned = [];
    },
};
