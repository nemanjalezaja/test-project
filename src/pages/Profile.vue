<template>
  <div class="w-full lg:w-8/12 xl:w-6/12 mx-auto flex-grow">
    <div v-if="!isEmpty(user)" class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="flex border-b border-gray-200 ">
        <div class="px-4 py-5 sm:px-6">
          <img class="inline-block h-12 w-12 rounded-full mb-3" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        </div>
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            <span v-if="profile">Hello,</span> {{ user.firstName }}
          </h3>
          <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
            User Profile
          </p>
        </div>
        <div class="px-4 py-2 gap-2 flex flex-col items-end sm:px-6 ml-auto">
          <span v-if="!profile" class="inline-flex rounded-md shadow-sm sm:w-auto">
            <button @click="editUser" type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none
              focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
              Message
            </button>
          </span>
          <span v-if="!profile" class="inline-flex rounded-md shadow-sm sm:w-auto">
            <button @click="handleFollow" type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none
              focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
              {{ follow  ? 'Unfollow': 'Follow'}}
            </button>
          </span>

          <span v-if="profile" class="inline-flex rounded-md shadow-sm sm:w-auto">
            <button @click="editUser" type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none
              focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
              Edit
            </button>
          </span>
        </div>
      </div>
      <div class="px-4 py-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <dt class="text-sm leading-5 font-medium text-gray-500">
              Email address
            </dt>
            <dd class="mt-1 text-sm leading-5 text-gray-900">
              {{ user.email }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm leading-5 font-medium text-gray-500">
              Full name
            </dt>
            <dd class="mt-1 text-sm leading-5 text-gray-900">
              {{ user.firstName }} {{ user.lastName }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm leading-5 font-medium text-gray-500">
              Following
            </dt>
            <dd class="mt-1 text-sm leading-5 text-gray-900">
              {{ user.following.length }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm leading-5 font-medium text-gray-500">
              Followers
            </dt>
            <dd class="mt-1 text-sm leading-5 text-gray-900">
              {{ user.followers.length }}
            </dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm leading-5 font-medium text-gray-500">
              About
            </dt>
            <dd class="mt-1 text-sm leading-5 text-gray-900">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis possimus incidunt maiores ab, molestiae quos tempora
              labore quidem expedita deserunt iste voluptas veniam, quaerat quis voluptatibus, saepe magnam voluptate iure?
            </dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm leading-5 font-medium text-gray-500">
              Posts
            </dt>
            <dd class="mt-1 text-sm leading-5 text-gray-900">
              <ul class="rounded-md">
                <li v-for="post in posts" :key="post.id" class="w-full flex flex-col py-3 px-1 border-b mb-2">
                    <span class="text-sm leading-5 text-gray-500 ml-auto">{{ post.createdAt | momentToDate }}</span>
                    <span class="text-sm leading-5 font-medium text-gray-900 ">{{ post.text }}</span>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_STATE, SET_STATE } from '@/store/index.types';
import { GET_USER_INFO } from '@/store/modules/auth/auth.types';
import { GET_USER_BY_ID, FETCH_USERS, FOLLOW_USER } from '@/store/modules/users/users.types';
import { FETCH_POSTS } from '@/store/modules/posts/posts.types';

import { isEmpty, filter, sortBy } from 'lodash';

export default {
  name: 'Profile',
  created() {
    // THIS IS NEEDED ONLY FOR REALODING THE PAGE
    this.$store.dispatch(FETCH_USERS).then(() => {
      // TODO stop loader show posts
    }).catch(() => {
      // TODO err message?, and/or loader stoper ....
    });
    this.$store.dispatch(FETCH_POSTS).then(() => {
      // TODO stop loader show posts
    }).catch(() => {
      // TODO err message?, and/or loader stoper ....
    });
    // END :: THIS IS NEEDED ONLY FOR REALODING THE PAGE

    this.userId = this.$route.params.id;
    if (this.$route.name === 'Profile') this.profile = true;
  },
  data() {
    return {
      userId: null,
      profile: false,
    };
  },
  watch: {
    $route() {
      if (this.$route.name === 'Profile') this.profile = true;
      else {
        this.userId = this.$route.params.id;
        this.profile = false;
      }
      this.$forceUpdate();
    },
  },
  computed: {
    ...mapGetters({ GET_STATE, GET_USER_INFO, GET_USER_BY_ID }),
    currentUser() {
      return this.GET_USER_INFO;
    },
    user() {
      if (this.profile) return this.currentUser;
      return this.GET_USER_BY_ID(this.userId);
    },
    posts() {
      if (this.profile) return sortBy(this.GET_STATE('posts', 'currentUserPosts'), 'createdAt');
      return sortBy(filter(this.GET_STATE('posts', 'posts'), (post) => +post.authorId === +this.userId), 'createdAt');
    },
    isEmpty() {
      return (prop) => isEmpty(prop);
    },
    follow() {
      return this.user.followers.includes(+this.currentUser.id);
      // return this.currentUser.following.includes(this.userId);
    },
  },
  methods: {
    handleFollow() {
      // handle loader, error message ....
      this.$store.dispatch(FOLLOW_USER, this.user).then().catch();
    },
    editUser() {
      this.$toast.error('OPS NOT IMPLEMENTED!', { duration: 0, dismissible: true });
    },
  },
  beforeDestroy() {
    this.$store.dispatch(SET_STATE, {
      module: 'posts',
      state: {
        posts: [],
        currentUserPosts: [],
      },
    });
    this.$store.dispatch(SET_STATE, {
      module: 'users',
      state: {
        users: [],
      },
    });
  },
};
</script>

<style>

</style>
