/* eslint-disable */
import _l from 'lodash';

export function getAssignatedMeters(state) {
    return state.metersAssigned;
}

export function getCfePrices(state) {
    return _l.cloneDeep(state.cfeValues.currentPrices);
}