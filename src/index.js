/* eslint-disable */
import Vue from 'vue';
import router from './router.js';
import store from './store/store.js';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import './index.scss';

Vue.use(BootstrapVue);

store.dispatch('user/syncRouter', router);

export default new Vue({
  el: '#root',
  router,
  store,
  render: h => h('router-view')
});
