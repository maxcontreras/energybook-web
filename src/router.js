/* eslint-disable */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/app/login/Login.vue';
import Dashboard from '@/app/dashboard/Dashboard.vue';
import Layout from '@/app/layout/Layout.vue';
import Clients from '@/app/clients/Clients.vue';

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
                    path: '/dashboard',
                    name: 'dashboard',
                    components: {
                        default: Dashboard
                    },
                    meta: { requiresAuth: true }
                },
                {
                    path: '/clientes',
                    name: 'clients',
                    components: {
                        default: Clients
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
