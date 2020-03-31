/* eslint-disable */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/app/login/Login.vue';
import Register from '@/app/register/Register.vue';
import Dashboard from '@/app/dashboard/Dashboard.vue';
import Dashboard2 from '@/app/dashboard/Dashboard2.vue';
import Layout from '@/app/layout/Layout.vue';
import Notificaciones from '@/app/notificaciones/notificaciones.vue';
import NewUser from '@/app/newuser/NewUser.vue';
import Companies from '@/app/companies/Companies.vue';
import Costs from '@/app/costs/Costs.vue';
import History from '@/app/history/ZHistory.vue';
import NetCode from '@/app/netCode/NetCode.vue';
import CarbonFootprint from '@/app/carbonFootprint/CarbonFootprint.vue';
import Generation from '@/app/generation/Generation.vue';
import Information from '@/app/information/Information.vue';
import Meters from '@/app/meters/Meters.vue';
import CFE from '@/app/cfe/CfeValues.vue';
import Customize from '@/app/customize/Customize.vue';
import Payments from '@/app/payments/Payments.vue';
import Calendar from '@/app/calendar/Calendar.vue';
import CompanyDetail from '@/app/companyDetail/CompanyDetail.vue';
import UserDetail from '@/app/userDetail/UserDetail.vue';
import Graphs from '@/app/graphs/Graphs.vue';
import partners from '@/app/partners/partners.vue'
import eficiencia from '@/app/eficiencia/eficiencia.vue';
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
                    path: '/',
                    name: 'eficiencia',
                    components: {
                        default: eficiencia
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/Admin',
                    name: 'Dashboard2',
                    components: {
                        default: Dashboard2
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
                    path: '/notificaciones',
                    name: 'notificaciones',
                    components: {
                        default: Notificaciones
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/costos',
                    name: 'userCosts',
                    components: {
                        default: Costs
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/codigoRed',
                    name: 'netCode',
                    components: {
                        default: NetCode
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/huellaCarbono',
                    name: 'carbonFootprint',
                    components: {
                        default: CarbonFootprint
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/generacion',
                    name: 'generation',
                    components: {
                        default: Generation
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/info',
                    name: 'information',
                    components: {
                        default: Information
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
                    path: '/partners',
                    name: 'partners',
                    components: {
                        default: partners
                    },
                    meta: { requiresAuth: true }

                },
                {
                    path: '/valoresCFE',
                    name: 'cfeValues',
                    components: {
                        default: CFE
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/personalizar',
                    name: 'customize',
                    components: {
                        default: Customize
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
                    path: '/historial',
                    name: 'history',
                    components: {
                        default: History
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
                    path: '/companiaPerfil',
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
