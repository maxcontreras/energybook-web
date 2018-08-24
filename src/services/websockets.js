/* eslint-disable */
import eUsers from '@/services/eUsers'
import store from '@/store'

let socket = require('engine.io-client')('http://localhost:3000/api')

socket.on('open', function () {

    socket.on('message', function (data) {
        let jsonData = JSON.parse(data);
        store.dispatch(`request/${jsonData.socketEvent}`, jsonData.data)
    })

    socket.on('close', function () { })
})

export default {
    init() {
        let request = {
            userId: eUsers.getCurrentId(),
            accessToken: JSON.parse(localStorage.getItem('loopback-token')).id,
            socketEvent: 'connect',
        };
        let requestData = JSON.stringify(request)
        socket.send(requestData);
    },

    cleanSocket() {
        socket = null
    }
}