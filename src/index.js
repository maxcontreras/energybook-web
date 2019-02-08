/* eslint-disable */
import Vue from 'vue'
import router from './router.js'
import store from './store/store.js'
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import Notifications from 'vue-notification'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'; // eslint-disable-line
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './index.scss'

Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBBkQHeDuyANETUPLQ9tvgKaQzSHLiaj2k',
    libraries: 'places'
  }
})

store.dispatch('user/syncRouter', router)

export default new Vue({
  el: '#root',
  router,
  store,
  render: h => h('router-view')
})
