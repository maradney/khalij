import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import SignIn from '@/views/SignIn.vue';
import Shop from '@/views/Shop.vue';
import Product from '@/views/Product.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
    beforeEnter() {
      window.location.href = 'http://khair-elkhalij.com';
    },
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/shop/:category?',
    name: 'Shop',
    component: Shop,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/products/:productId',
    name: 'Shop',
    component: Product,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/sign-in');
  } else {
    next();
  }
});

export default router;
