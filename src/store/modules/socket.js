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
            commit('setOdometer', data);
        },
        dailyReading({commit}, data) {
            commit('setLastUpdated', data.lastUpdated);
            commit('setDaily', data);
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
            commit('setPowerFactor', data);
        },
        reactive({commit}, data) {
            commit('setReactive', data);
        }
    },
    mutations: {
        setLastUpdated(state, date) {
            state.lastUpdated = moment(date).format("HH:mm");
            saveInLocalStorage('lUpdated', moment().format("HH:mm"));
        },
        setDaily(state, data) {
            state.distribution = data.distribution;
            saveInLocalStorage('distribution', data.distribution);
            state.distributionCharge = data.chargeDistribution;
            saveInLocalStorage('distributionCharge', data.chargeDistribution);
            state.consumption = data.consumption;
            saveInLocalStorage('consumption', data.consumption);
            state.capacity = data.capacity;
            saveInLocalStorage('capacity', data.capacity);
        },
        setOdometer(state, value) {
            state.odometer = parseFloat(value);
            saveInLocalStorage('odometer', value);
        },
        setMonthly(state, data) {
            state.distributionMonth = parseFloat(data.distribution);
            saveInLocalStorage('distributionMonth', data.distribution);
            state.consumptionMonth = parseFloat(data.consumption);
            saveInLocalStorage('consumptionMonth', data.consumption);
            state.capacityMonth = parseFloat(data.capacity);
            saveInLocalStorage('capacityMonth', data.capacity);
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
