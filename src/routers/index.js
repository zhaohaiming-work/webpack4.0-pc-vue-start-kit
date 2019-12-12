import Vue from 'vue';
import Router from 'vue-router';
import Index from '../views/home';
import Test from '../views/test';
Vue.use(Router);
export default new Router({
  routerMode: 'hash',
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/test',
          component: Test,
        }
      ]
    }
  ]
})