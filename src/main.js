import Vue from 'vue'
import App from './App.vue'
import router from './router'
import provedor from './provedor'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { validate } from 'vee-validate'
import VueApexCharts from 'vue-apexcharts'
import http from '@/http'
import Toast from 'vue-toastification'
import VueSweetalert2 from "vue-sweetalert2";
import vSelect from "vue-select";

import "sweetalert2/dist/sweetalert2.min.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "@/directives/index";
import "vue-toastification/dist/index.css";
import "vue-select/dist/vue-select.css";

Vue.config.productionTip = false

Vue.prototype.$http = http

Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(validate)
Vue.use(Toast)
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
Vue.component("v-select", vSelect);

new Vue({
  router,
  store: provedor,
  render: h => h(App)
}).$mount('#app')
