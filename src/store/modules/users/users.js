import { filter, includes, find } from 'lodash';
import to from 'await-to-js';

import { api } from '@/api/axios';
import { GET_USER_INFO, SET_USER_INFO } from '@/store/modules/auth/auth.types';

import removeNamespace from '@/store/namespace-helper';
import * as usersTypes from './users.types';

const moduleName = 'users';
const privateTypes = removeNamespace(`${moduleName}/`, usersTypes);

const auth = {
  namespaced: true,
  state: {
    users: [],
  },
  getters: {
    [privateTypes.GET_USER_BY_ID]: (state) => (id) => (find(state.users, (user) => +user.id === +id)),
    [privateTypes.GET_USERS_BY_SEARCH_PARAM]: (state) => (search) => filter(state.users, (user) => (user.firstName.toLowerCase().includes(search.toLowerCase()) || user.lastName.toLowerCase().includes(search.toLowerCase()))),
  },
  mutations: {
    [privateTypes.SET_USERS]: (state, payload) => {
      state.users = [...payload];
    },
    [privateTypes.FOLLOWER_USER]: (state, payload) => {
      const user = find(state.users, (u) => +u.id === +payload.id);
      user.followers = [...payload.followers];
      user.followers = [...payload.followers];
    },
    [privateTypes.FOLLOWING_USER]: (state, payload) => {
      const user = find(state.users, (u) => +u.id === +payload.id);
      user.following = [...payload.following];
    },
  },
  actions: {
    async [privateTypes.FETCH_USERS]({ commit }) {
      let err = {};
      let response = {};
      [err, response] = await to(api.get('/users'));
      if (response.status === 200) {
        commit(privateTypes.SET_USERS, response.data);
        return Promise.resolve();
      }
      return Promise.reject(err);
    },
    async [privateTypes.FOLLOW_USER]({ commit, rootGetters }, user) {
      // PART OF THIS FUNCTION WOULD BE DONE ON BE;
      const currentUser = rootGetters[GET_USER_INFO];
      let followers = [...user.followers];
      let following = [...currentUser.following];
      const follow = includes(followers, currentUser.id);

      if (follow) {
        followers = filter(user.followers, (id) => +id !== +currentUser.id);
        following = filter(currentUser.following, (id) => +id !== +user.id);
      } else {
        followers.push(currentUser.id);
        following.push(user.id);
      }

      let err = {};
      let response = {};
      [err, response] = await to(api.patch(`/users/${currentUser.id}`, { following }));
      if (response.status === 200) {
        commit(privateTypes.FOLLOWING_USER, { ...currentUser, following });
        commit(SET_USER_INFO, { ...currentUser, following }, { root: true });
      }

      [err, response] = await to(api.patch(`/users/${user.id}`, { followers }));

      if (response.status === 200) {
        commit(privateTypes.FOLLOWER_USER, response.data);
        return Promise.resolve();
      }
      return Promise.reject(err);
    },
  },
};

export default auth;
