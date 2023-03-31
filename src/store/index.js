import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { keys, each } from 'lodash';

import modules from './modules';
import * as types from './index.types';

Vue.use(Vuex);

// GLOBAL GETTERS
const getters = {
  [types.GET_STATE]: (state) => (module, prop) => state[module][prop],
};

// GLOBAL MUTATIONS
const mutations = {
  [types.SET_STATE]: (state, prop) => {
    each(keys(prop.state), (key) => {
      state[prop.module][key] = prop.state[key];
    });
  },
};

// GLOBAL ACTIONS
const actions = {
  [types.SET_STATE]({ commit }, payload) {
    commit(types.SET_STATE, payload);
  },
  [types.SET_MODULE_STATE]({ commit }, payload) {
    commit(payload.mutation, payload.obj);
  },
};

export default new Vuex.Store({
  getters,
  mutations,
  actions,
  modules,
  plugins: [
    createPersistedState({
      paths: [
        'auth',
      ],
    }),
  ],
});
