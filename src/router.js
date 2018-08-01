/* eslint-disable */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/app/login/Login.vue';
import Register from '@/app/register/Register.vue';
import Dashboard from '@/app/dashboard/Dashboard.vue';
import Layout from '@/app/layout/Layout.vue';
import Companies from '@/app/companies/Companies.vue';
import Meters from '@/app/meters/Meters.vue';
import Payments from '@/app/payments/Payments.vue';
import Calendar from '@/app/calendar/Calendar.vue';
import MyCompany from '@/app/myCompany/MyCompany.vue';
import Analysis from '@/app/analysis/Analysis.vue';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
            path: '/',
            name: 'layout',
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
                    path: '/mi_empresa',
                    name: 'myCompany',
                    components: {
                        default: MyCompany
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/analisis',
                    name: 'analysis',
                    components: {
                        default: Analysis
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
});

export default router;
