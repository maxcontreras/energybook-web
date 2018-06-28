/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentView: ''
	},

	modules: {
		user
	},

	mutations: {
		setCurrentView(state, route) {
            state.currentView = route.name
        }
	}
});
