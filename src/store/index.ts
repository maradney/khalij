import Vue from 'vue';
import Vuex from 'vuex';
import { SignInResponse } from '@/types/SignInResponse';

Vue.use(Vuex);

type stateOptions = {
  status: string,
  token: string,
  user: SignInResponse['data'],
};

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
  } as stateOptions,
  mutations: {
    auth_request(state): void {
      state.status = 'loading';
    },
    auth_success(state: stateOptions, payload: { token: stateOptions['token'], user: stateOptions['user'] }): void {
      state.status = 'success';
      state.token = payload.token;
      state.user = payload.user;
    },
    auth_error(state): void {
      state.status = 'error';
    },
    logout(state): void {
      state.status = '';
      state.token = '';
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  actions: {
  },
  modules: {
  },
});
