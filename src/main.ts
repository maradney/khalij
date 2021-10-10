import Vue from 'vue';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import VueMeta from 'vue-meta';
import App from './App.vue';
import router from './router';
import store from './store';
import CartPM from '@/presentation-models/CartPM';

Vue.use(VueMeta);

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
}

Vue.prototype.$http.interceptors.response.use((response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  });

Vue.mixin({
  data() {
    return {
      cartPM: new CartPM(),
    };
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
