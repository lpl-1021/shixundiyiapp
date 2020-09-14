import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible';
import 'vant/lib/index.css';
import netClient from "./Newwork/requst"

// 全局引入按需引入UI库 vant
import '@/plugins/vant'

Vue.prototype.$netClient = netClient
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
