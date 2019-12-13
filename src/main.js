import Vue from 'vue'
import App from './App'
import router from './routers/'
import './styles/base'
Vue.config.productionTip = false

const render = () =>
  new Vue({
    render: h => h(App),
    router
  }).$mount('#app')

render()

if (__DEV__) {
  if (module.hot) {
    module.hot.accept(['./App', './routers', './styles/base.scss'], () =>
      Promise.resolve().then(render)
    )
  }
}
