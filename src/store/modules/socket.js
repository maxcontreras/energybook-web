/* eslint-disable */
export default {
    namespaced: true,
    state: {
        distribution: 0,
        odometer: 0,
        demand: 0
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
        }
    },
    mutations: {
        setDistribution(state, value) {
            state.distribution = value
        },
        setOdometer(state, value) {
            state.odometer = parseFloat(value)
        },
        setDemand(state, value) {
            state.demand = parseFloat(value)
        }
    }
}