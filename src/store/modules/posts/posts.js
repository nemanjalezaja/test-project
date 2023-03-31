import {
  each, includes, filter, find,
} from 'lodash';
import moment from 'moment';
import to from 'await-to-js';

import { api } from '@/api/axios';

import { GET_USER_INFO } from '@/store/modules/auth/auth.types';

import removeNamespace from '@/store/namespace-helper';
import * as postTypes from './posts.types';

const moduleName = 'posts';
const privateTypes = removeNamespace(`${moduleName}/`, postTypes);

const auth = {
  namespaced: true,
  state: {
    posts: [],
    currentUserPosts: [],
  },
  mutations: {
    [privateTypes.SET_POSTS]: (state, posts) => {
      const currentUserId = localStorage.getItem('accessToken');
      // filter all current user post so it wont be need later
      each(posts, (post) => {
        if (+post.authorId === +currentUserId) state.currentUserPosts.push(post);
        else state.posts.push(post);
      });
    },
    [privateTypes.LIKE_POST]: (state, payload) => {
      const post = find(state.posts, (p) => +p.id === +payload.id);
      post.likedBy = [...payload.likedBy];
    },
    [privateTypes.CREATE_POST]: (state, post) => {
      state.currentUserPosts.push({ ...post });
    },
  },
  actions: {
    async [privateTypes.FETCH_POSTS]({ commit }) {
      let err = {};
      let response = {};
      [err, response] = await to(api.get('/posts'));
      if (response.status === 200) {
        commit(privateTypes.SET_POSTS, response.data);
        return Promise.resolve();
      }
      return Promise.reject(err);
    },
    async [privateTypes.CREATE_POST]({ rootGetters, commit }, text) {
      const currentUser = rootGetters[GET_USER_INFO];
      const post = {
        type: 'text', // this is only because I wont be making other type of post
        imgUrl: '', // in case we decide to make img post..
        text, // text is passed from createPost component
        author: `${currentUser.firstName} ${currentUser.lastName}`,
        authorId: currentUser.id,
        likedBy: [],
        createdAt: moment().unix(),
        // if post had comments I would add list of commentIds and on demant would fetch and show them...
        // commentIds: [],

      };
      let err = {};
      let response = {};
      [err, response] = await to(api.post('/posts', { ...post }));
      if (response.status === 201) {
        commit(privateTypes.CREATE_POST, response.data);
        return Promise.resolve();
      }
      return Promise.reject(err);
    },
    async [privateTypes.LIKE_POST]({ commit, rootGetters }, post) {
      // PART OF THIS FUNCTION WOULD BE DONE ON BE;
      const currentUser = rootGetters[GET_USER_INFO];
      let likedBy = [...post.likedBy];
      const liked = includes(post.likedBy, currentUser.id);
      if (liked) likedBy = filter(post.likedBy, (id) => +id !== +currentUser.id);
      else likedBy.push(currentUser.id);
      let err = {};
      let response = {};
      [err, response] = await to(api.patch(`/posts/${post.id}`, { likedBy }));
      if (response.status === 200) {
        commit(privateTypes.LIKE_POST, response.data);
        return Promise.resolve();
      }
      return Promise.reject(err);
    },
  },
};

export default auth;
