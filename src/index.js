/* eslint-disable */
import Vue from "vue";
import router from "./router.js";
import VueGtm from "vue-gtm";
import store from "./store/store.js";
import BootstrapVue from "bootstrap-vue";
import * as VueGoogleMaps from "vue2-google-maps";
import Notifications from "vue-notification";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css"; // eslint-disable-line
import "bootstrap-vue/dist/bootstrap-vue.css";

import "./index.scss";

Vue.use(VueGtm, {
  id: "GTM-5ZRBN2V", // Your GTM single container ID or array of container ids ['GTM-xxxxxxx', 'GTM-yyyyyyy']
  defer: false, // defaults to false. Script can be set to `defer` to increase page-load-time at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible)
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: true, // Whether or not display console logs debugs (optional)
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
});

Vue.use(BootstrapVue);
Vue.use(Notifications);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBT6-S-fu0syYKb8elYDmkU-tlEGuxbhzY",
    libraries: "places",
  },
});

store.dispatch("user/syncRouter", router);

export default new Vue({
  el: "#root",
  router,
  store,
  render: (h) => h("router-view"),
});
