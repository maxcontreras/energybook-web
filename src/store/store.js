/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentView: '',
		isAdmin: false,
        isManager: false,
        isUser: false,
        isAccounting: false,
        company_id: ''
	},

	modules: {
		user
	},

	mutations: {
		setCurrentView(state, route) {
            state.currentView = route.name
        },
		setRole(state, user) {
			state.isAdmin = false;
            state.isManager = false;
            state.isUser = false;
            state.isAccounting = false;
            switch(user.role_id) {
                case 1: 
                    state.isAdmin = true;
                    break;
                case 2:
                    state.isUser = true;
                    break;
                case 3:
                    state.isManager = true;
                    break;
                case 4:
                    state.isAccounting = true;
                    break;
			} 
        },
        setCompanyId(state, id) {
            state.company_id = id;
        } 
    }
});
