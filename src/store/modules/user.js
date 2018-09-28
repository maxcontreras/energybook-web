/* eslint-disable */
import loopback from '@/services/loopback'
import router from '@/router'
import eUsers from '@/services/eUsers'
import websockets from '@/services/websockets'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        access_token: '',
        user: ''
    },
    actions: {
        syncToken({ state, commit, dispatch }) {
            if (loopback.token) {
                commit('setAccessToken', loopback.token)
                dispatch('loadAccount', state.access_token.userId)
            }
        },

        syncRouter({ state, commit, dispatch }, myRouter) {
            dispatch('syncToken')

            myRouter.beforeEach((to, from, next) => {
                if (to.matched.some(record => record.meta.requiresAuth)) {
                    if (!state.access_token) {
                        next({
                            name: 'login',
                        })
                    } else {
                        commit('setCurrentView', to, { root: true })
                        next()
                    }
                } else {
                    next()
                }
            })
        },
        login({ commit, dispatch, state }, { email, password }) {
            return eUsers.login({ email, password }).then(token => {
                commit('setAccessToken', token)

                if (state.access_token === null) {
                    loopback.removeToken()
                } else {
                    loopback.setToken(state.access_token)
                }

                dispatch('loadAccount', state.access_token.userId)
                
            }).catch(e => {
                Vue.notify({
                    group: 'login',
                    title: 'Login fallido',
                    text: 'El correo o contraseña son incorrectos',
                    type: 'error'
                  })
            })
        },
        loadAccount({ commit }, id) {
            return eUsers.findById({ id }).then(user => {

                if(localStorage.getItem('user') === null) {
                    localStorage.setItem('user', JSON.stringify(user))
                    router.push({ name: 'dashboard' })
                }
                
                commit('setUser', user)
                commit('setRole', user, { root: true })
                commit('setCompanyId', user.company_id, { root: true })
                websockets.init()
            }).catch(() => {
                loopback.removeToken()
                router.push({ name: 'login' })
            })
        },
        logout({}) {
            eUsers.logout().then(() => {
                websockets.cleanSocket();
                loopback.removeToken()
                router.push({ name: 'login' })
            })
        }
    },
    mutations: {
        setAccessToken(state, token) {
            state.access_token = token
        },
        setUser(state, user) {
            state.user = user
        }
    }
}
