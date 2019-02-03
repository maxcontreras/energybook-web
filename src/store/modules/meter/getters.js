/* eslint-disable */
import _l from 'lodash';

export function getAssignatedMeters(state) {
    return state.metersAssigned;
}

export function getMeters(state) {
    return state.meters;
}

export function getCfePrices(state) {
    return _l.cloneDeep(state.cfeValues.prices);
}