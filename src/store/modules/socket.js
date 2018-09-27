/* eslint-disable */
var user = JSON.parse(localStorage.getItem('user'))

function saveInLocalStorage(key, value) {
    user[key] = value
    localStorage.setItem('user', JSON.stringify(user))
}

function getLocalStorageItem(key) {
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
        epimpHistory: getLocalStorageItem('epimpHistory')
    },
    actions: {
        checkStatus({}, data) {
            console.log(data)
        },
        odometerReading({commit}, data) {
            console.log('odometer')
            console.log(data);
            commit('setOdometer', data)
        },
        distributionReading({commit}, data) {
            console.log('distribution')
            console.log(data)
            commit('setDistribution', data)
        },
        demandReading({commit}, data) {
            console.log('demand')
            console.log(data)
            commit('setDemand', data)
        },
        epimpHistoryReading({commit}, data) {
            console.log('epimp')
            console.log(data)
            commit('setEpimpHistory', data)
        }
    },
    mutations: {
        setDistribution(state, value) {
            state.distribution = value
            saveInLocalStorage('distribution', value)
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