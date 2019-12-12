import Vue from 'vue'
import App from './App'
import router from './routers/'
import './styles/base'
Vue.config.productionTip = false
let vm = new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
