/* eslint-disable */
import moment from 'moment';

function saveInLocalStorage(key, value) {
    var user = JSON.parse(localStorage.getItem('user'))
    user[key] = value
    localStorage.setItem('user', JSON.stringify(user))
}

function getLocalStorageItem(key) {
    var user = JSON.parse(localStorage.getItem('user'))
    let defaultVal = 0
    if(key === 'epimpHistory') defaultVal = []
    if(user === null) return defaultVal
    return user[key]? user[key] : defaultVal
}

export default {
    namespaced: true,
    state: {
        distribution: getLocalStorageItem('distribution'),
        odometer: getLocalStorageItem('odometer'),
        distributionMonth: getLocalStorageItem('distributionMonth'),
        epimpHistory: getLocalStorageItem('epimpHistory'),
        distributionCharge: getLocalStorageItem('distributionCharge'),
        consumption: getLocalStorageItem('consumption'),
        consumptionMonth: getLocalStorageItem('consumptionMonth'),
        consumptionSummary: getLocalStorageItem('consumptionSummary'),
        capacity: getLocalStorageItem('capacity'),
        capacityMonth: getLocalStorageItem('capacityMonth'),
        powerFactor: getLocalStorageItem('powerFactor'),
        reactive: getLocalStorageItem('reactive'),
        lastUpdated: (getLocalStorageItem('lUpdated'))? getLocalStorageItem('lUpdated'): "00:00"
    },
    actions: {
        odometerReading({commit}, data) {
            commit('setOdometer', data.value);
        },
        dailyReading({commit}, data) {
            commit('setLastUpdated');
            commit('setDistribution', data);
        },
        monthlyReading({commit}, data) {
            commit('setMonthly', data);
        },
        epimpHistoryReading({commit}, data) {
            commit('setEpimpHistory', data);
        },
        consumptionSummary({commit}, data) {
            commit('setConsumptionSummary', data);
        },
        powerFactor({commit}, data) {
            commit('setPowerFactor', data.value);
        },
        reactive({commit}, data) {
            commit('setReactive', data.value);
        }
    },
    mutations: {
        setLastUpdated(state) {
            state.lastUpdated = moment().format("HH:mm");
            saveInLocalStorage('lUpdated', moment().format("HH:mm"));
        },
        setDistribution(state, data) {
            state.distribution = data.distribution.daily
            saveInLocalStorage('distribution', data.distribution.daily);
            state.distributionCharge = data.distribution.charge;
            saveInLocalStorage('distributionCharge', data.distribution.charge);
            state.consumption = data.consumption.daily;
            saveInLocalStorage('consumption', data.consumption.daily);
            state.capacity = data.capacity.daily;
            saveInLocalStorage('capacity', data.capacity.daily);
        },
        setOdometer(state, value) {
            state.odometer = parseFloat(value);
            saveInLocalStorage('odometer', value);
        },
        setMonthly(state, data) {
            state.distributionMonth = parseFloat(data.distribution.monthly);
            saveInLocalStorage('distributionMonth', data.distribution.monthly);
            state.consumptionMonth = parseFloat(data.consumption.monthly);
            saveInLocalStorage('consumptionMonth', data.consumption.monthly);
            state.capacityMonth = parseFloat(data.capacity.monthly);
            saveInLocalStorage('capacityMonth', data.capacity.monthly);
        },
        setEpimpHistory(state, value) {
            state.epimpHistory = value;
            saveInLocalStorage('epimpHistory', value);
        },
        setConsumptionSummary(state, value) {
            state.consumptionSummary = value;
            saveInLocalStorage('consumptionSummary', value);
        },
        setPowerFactor(state, value) {
            state.powerFactor = value;
            saveInLocalStorage('powerFactor', value);
        },
        setReactive(state, value) {
            state.reactive = value;
            saveInLocalStorage('reactive', value);
        }
    }
}
