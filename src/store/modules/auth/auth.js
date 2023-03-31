import {
  each, keys, find, isEmpty,
} from 'lodash';
import to from 'await-to-js';

import { api } from '@/api/axios';

import removeNamespace from '@/store/namespace-helper';
import * as authTypes from './auth.types';

const moduleName = 'auth';
const privateTypes = removeNamespace(`${moduleName}/`, authTypes);

const auth = {
  namespaced: true,
  state: {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '', // only in this mock test will be saved here
  },
  getters: {
    [privateTypes.GET_USER_INFO]: (state) => state,
  },
  mutations: {
    [privateTypes.SET_USER_INFO]: (state, payload) => {
      each(keys(payload), (key) => {
        state[key] = payload[key];
      });
    },
  },
  actions: {
    async [privateTypes.REGISTER_USER](context, payload) {
      let err = {};
      let response = {};
      [err, response] = await to(api.post('/users', { ...payload }));
      if (response.status === 201) return Promise.resolve();
      return Promise.reject(err);
    },
    async [privateTypes.LOG_USER]({ commit }, payload) {
      // usually we will send credentions but in this case we need to find user in db
      // didn't know that json-server has filter params... can be refactorted...
      // but in this use case is fine stay this way...
      let err = {};
      let response = {};
      [err, response] = await to(api.get('/users'));
      if (!isEmpty(err)) return Promise.reject(err);
      const users = response.data;
      const user = find(users, (u) => u.email === payload.email);
      if (user && user.password === payload.password) {
        localStorage.setItem('accessToken', user.id);
        // NOTE this is something I would usualy do if nessessary... set headers for api
        // api.defaults.headers = {
        //   Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        // };
        commit(privateTypes.SET_USER_INFO, user);
        return Promise.resolve();
      }
      return Promise.reject(err);
    },
  },
};

export default auth;
