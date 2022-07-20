import Vue from 'vue'
import App from './App.vue'
import router from './router'
import provedor from './provedor'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { validate } from 'vee-validate'
import VueApexCharts from 'vue-apexcharts'
import http from '@/http'
import "@/directives/index";


Vue.config.productionTip = false

Vue.prototype.$http = http

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(validate)
Vue.use(VueApexCharts)


Vue.component('apexchart', VueApexCharts)


new Vue({
  router,
  store: provedor,
  render: h => h(App)
}).$mount('#app')
