/* eslint-disable */
export default {
    namespaced: true,
    state: {},
    actions: {
        connection({}, message) {
            console.log(message)
        },
        checkStatus({}, data) {
            console.log(data);
        },
        odometerReading({}, data) {
            console.log(data);
        }
    },
    mutations: {}
}