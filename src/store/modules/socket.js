/* eslint-disable */

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
        demand: getLocalStorageItem('demand'),
        epimpHistory: getLocalStorageItem('epimpHistory'),
        distributionCharge: getLocalStorageItem('distributionCharge')
    },
    actions: {
        odometerReading({commit}, data) {
            commit('setOdometer', data.value)
        },
        distributionReading({commit}, data) {
            commit('setDistribution', data)
        },
        demandReading({commit}, data) {
            commit('setDemand', data.value)
        },
        epimpHistoryReading({commit}, data) {
            commit('setEpimpHistory', data)
        }
    },
    mutations: {
        setDistribution(state, value) {
            state.distribution = value.value
            saveInLocalStorage('distribution', value.value)
            state.distributionCharge = value.charge
            saveInLocalStorage('distributionCharge', value.charge)
        },
        setOdometer(state, value) {
            state.odometer = parseFloat(value)
            saveInLocalStorage('odometer', value)
        },
        setDemand(state, value) {
            state.demand = parseFloat(value)
            saveInLocalStorage('demand', value)
        },
        setEpimpHistory(state, value) {
            state.epimpHistory = value
            saveInLocalStorage('epimpHistory', value)
        }
    }
}