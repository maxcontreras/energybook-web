/* eslint-disable */
export default {
    namespaced: true,
    state: {
        distribution: 0,
        odometer: 0
    },
    actions: {
        checkStatus({}, data) {
            console.log(data)
        },
        odometerReading({commit}, data) {
            commit('setOdometer', data)
        },
        distributionReading({commit}, data) {
            commit('setDistribution', data)
        }
    },
    mutations: {
        setDistribution(state, value) {
            state.distribution = value
        },
        setOdometer(state, value) {
            state.odometer = parseFloat(value)
        }
    }
}