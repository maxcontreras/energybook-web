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
            commit('setLastUpdated', (data.lastUpdated) ? data.lastUpdated: moment().subtract(1, "day").format());
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
            let saveDate = moment(date).format("HH:mm");
            if (moment(date).isBefore(moment().format())) {
                saveDate = "hace mucho";
            }
            state.lastUpdated = saveDate;
            saveInLocalStorage('lUpdated', saveDate);
        },
        setDaily(state, data) {
            const distribution = (data.distribution) ? data.distribution : 0;
            state.distribution = distribution;
            saveInLocalStorage('distribution', distribution);

            const chargeDistribution = (data.chargeDistribution) ? data.chargeDistribution : 0;
            state.distributionCharge = chargeDistribution;
            saveInLocalStorage('distributionCharge', chargeDistribution);

            const consumption = (data.consumption) ? data.consumption: 0;
            state.consumption = consumption;
            saveInLocalStorage('consumption', consumption);

            const capacity = (data.capacity) ? data.capacity : 0;
            state.capacity = capacity;
            saveInLocalStorage('capacity', capacity);
        },
        setOdometer(state, value) {
            state.odometer = parseFloat(value);
            saveInLocalStorage('odometer', value);
        },
        setMonthly(state, data) {
            const distribution = (data.distribution) ? data.distribution : 0;
            state.distributionMonth = parseFloat(distribution);
            saveInLocalStorage('distributionMonth', distribution);

            const consumption = (data.consumption) ? data.consumption: 0;
            state.consumptionMonth = parseFloat(consumption);
            saveInLocalStorage('consumptionMonth', consumption);

            const capacity = (data.capacity) ? data.capacity : 0;
            state.capacityMonth = parseFloat(capacity);
            saveInLocalStorage('capacityMonth', capacity);
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
