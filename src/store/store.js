/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user.js";
import socket from "./modules/socket";
import meter from "./modules/meter";

import _l from "lodash";

Vue.use(Vuex);

function saveInLocalStorage(key, value) {
  var user = JSON.parse(localStorage.getItem("user"));
  user[key] = value;
  localStorage.setItem("user", JSON.stringify(user));
}

function getLocalStorageItem(key) {
  var user = JSON.parse(localStorage.getItem("user"));
  let defaultVal = false;
  if (user === null) return defaultVal;
  return user[key] ? user[key] : defaultVal;
}

export default new Vuex.Store({
  state: {
    notificaciones: 0,
    isadminNormal: false,
    currentView: "",
    services: [],
    selectedService: "",
    mode: "",
    isAdmin: false,
    isManager: false,
    isUser: false,
    isAccounting: false,
    company_id: "",
    company_Administration: "",
    currentCompanyDetailId: getLocalStorageItem("currentCompanyDetailId"),
  },

  modules: {
    user,
    socket,
    meter,
  },

  mutations: {
    setCurrentView(state, route) {
      state.currentView = route.name;
    },
    mode(state, name) {
      state.mode = name;
    },
    setRole(state, user) {
      state.isAdmin = false;
      state.isManager = false;
      state.isUser = false;
      state.isAccounting = false;
      switch (user.role_id) {
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
    },
    setCurrentCompanyDetailId(state, id) {
      state.currentCompanyDetailId = id;
      saveInLocalStorage("currentCompanyDetailId", id);
    },
    setServiceSelected(state, service) {
      state.selectedService = service;
    },
    setUserServices(state, services) {
      state.services = _l.cloneDeep(services);
    },
  },
});
