/* eslint-disable */

import * as actions from './actions';
import mutations from './mutations';
import * as getters from './getters';
import state from './state';

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
