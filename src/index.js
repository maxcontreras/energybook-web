/* eslint-disable */
import Vue from 'vue';
import router from './router.js';
import store from './store/store.js';
import BootstrapVue from 'bootstrap-vue';
import HighchartsVue from 'highcharts-vue';
import Vuetify from 'vuetify'
import DaySpanVuetify from 'dayspan-vuetify'
import * as VueGoogleMaps from 'vue2-google-maps';

//import 'vuetify/dist/vuetify.min.css';
//import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import './index.scss';

Vue.use(BootstrapVue);
Vue.use(HighchartsVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBBkQHeDuyANETUPLQ9tvgKaQzSHLiaj2k',
    libraries: 'places'
  }
});
//Vue.use(Vuetify);
/*Vue.use(DaySpanVuetify, {
  methods: {
    getDefaultEventColor: () => '#1976d2'
  }
});*/

store.dispatch('user/syncRouter', router);

export default new Vue({
  el: '#root',
  router,
  store,
  render: h => h('router-view')
});
