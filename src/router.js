/* eslint-disable */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/app/login/Login.vue'
import Register from '@/app/register/Register.vue'
import Dashboard from '@/app/dashboard/Dashboard.vue'
import Layout from '@/app/layout/Layout.vue'
import Companies from '@/app/companies/Companies.vue'
import Meters from '@/app/meters/Meters.vue'
import Payments from '@/app/payments/Payments.vue'
import Calendar from '@/app/calendar/Calendar.vue'
import CompanyDetail from '@/app/companyDetail/CompanyDetail.vue'
import UserDetail from '@/app/userDetail/UserDetail.vue'
import Graphs from '@/app/graphs/Graphs.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
            path: '/',
            component: Layout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    components: {
                        default: Dashboard
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/companias',
                    name: 'companies',
                    components: {
                        default: Companies
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/medidores',
                    name: 'meters',
                    components: {
                        default: Meters
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/pagos',
                    name: 'payments',
                    components: {
                        default: Payments
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/calendario',
                    name: 'calendar',
                    components: {
                        default: Calendar
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/companiaDetalle',
                    name: 'companyDetail',
                    components: {
                        default: CompanyDetail
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/compania/profile/:id',
                    name: 'companyProfile',
                    components: {
                        default: UserDetail
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/perfil',
                    name: 'profile',
                    components: {
                        default: UserDetail
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/graficas',
                    name: 'graphs',
                    components: {
                        default: Graphs
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/costos',
                    name: 'costs',
                    components: {
                        default: Graphs
                    },
                    meta: { requiresAuth: true }
                }
            ]
        },
		{
			path: '/login',
			name: 'login',
			components: {
				default: Login
			}
		},
		{
			path: '/registro',
			name: 'register',
			components: {
				default: Register
			}
		}
	]
})

export default router
