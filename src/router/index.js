import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Main,
  },
  {
    path: '/goodsList',
    name: 'GoodsList',
    component: () => import(/* webpackChunkName: "goodsList" */ '../views/GoodsList.vue'),
  },
  {
    path: '/goodsDetails',
    name: 'goodsDetails',
    component: () => import(/* webpackChunkName: "goodsDetails" */ '../views/GoodsDetails.vue'),
  },
  {
    path: '/buy',
    name: 'buy',
    component: () => import(/* webpackChunkName: "buy" */ '../views/Buy.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
