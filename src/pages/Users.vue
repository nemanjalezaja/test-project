<template>
  <div class="relative w-full lg:w-8/12 xl:w-6/12 mx-auto flex-grow">
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6 mb-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Looking for someone?
        </h3>
        <div class="mt-2 max-w-xl text-sm leading-5 text-gray-500">
          <p>
            try typing email or name...
          </p>
        </div>
        <div class="mt-5 sm:flex sm:items-center">
          <div class="max-w-xs w-full">
            <label for="search-param" class="sr-only">Email</label>
            <div class="relative rounded-md shadow-sm">
              <input v-model="search" id="search-param" class="form-input p-2 block w-full sm:text-sm sm:leading-5" placeholder="Who are you looking for?">
            </div>
          </div>
          <span class="mt-3 inline-flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto">
            <button type="submit" class="inline-flex items-center px-2.5 py-1.5 border bg-indigo-600 text-white text-xs leading-4 font-medium rounded hover:bg-indigo-500 focus:outline-none
              focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
              SEARCH
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul>
        <div v-for="user in users" :key="user.id">
          <UserListItem :user="user" @handleFollow="handleFollow(user)" :follow="user.followers.includes(currentUser.id)" :currentUserId="currentUser.id"/>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserListItem from '@/components/UserListItem.vue';
import { GET_USERS_BY_SEARCH_PARAM, FETCH_USERS, FOLLOW_USER } from '@/store/modules/users/users.types';
import { SET_STATE } from '@/store/index.types';
import { GET_USER_INFO } from '@/store/modules/auth/auth.types';

export default {
  name: 'Users',
  components: { UserListItem },
  computed: {
    ...mapGetters({ GET_USERS_BY_SEARCH_PARAM, GET_USER_INFO }),
    users() {
      if (this.search.length > 0) return this.GET_USERS_BY_SEARCH_PARAM(this.search);
      return [];
    },
    currentUser() {
      return this.GET_USER_INFO;
    },
  },
  data() {
    return {
      search: '',
    };
  },
  created() {
    this.$store.dispatch(FETCH_USERS).then(() => {
      // TODO stop loader show posts
    }).catch(() => {
      // TODO err message?, and/or loader stoper ....
    });
  },
  methods: {
    handleFollow(user) {
      // handle loader, error message ....
      this.$store.dispatch(FOLLOW_USER, user).then().catch();
    },
  },
  beforeDestroy() {
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
