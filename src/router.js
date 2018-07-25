/* eslint-disable */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/app/login/Login.vue';
import Dashboard from '@/app/dashboard/Dashboard.vue';
import Layout from '@/app/layout/Layout.vue';
import Companies from '@/app/companies/Companies.vue';
import Meters from '@/app/meters/Meters.vue';
import Payments from '@/app/payments/Payments.vue';

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
                    path: '/reportes',
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
                }
            ]
        },
		{
			path: '/login',
			name: 'login',
			components: {
				default: Login
			}
		}
	]
});

export default router;
