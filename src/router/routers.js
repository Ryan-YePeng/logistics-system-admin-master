import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

let constantRouterMap = [
  {path: '/404', name: 'error404', component: () => import('../views/error/error404')},
  {path: '/403', name: 'error403', component: () => import('../views/error/error403')},
  {path: '/login', name: 'login', component: () => import('../views/login')}
];

export default new Router({
  // mode: 'history',
  routes: constantRouterMap
})
