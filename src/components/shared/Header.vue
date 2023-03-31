<template>
  <div class="w-screen shadow-md mb-10">
    <nav class="mx-auto flex items-center justify-between p-6 lg:px-8 w-full lg:w-10/12 xl:w-8/12 2xl:w-6/12" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
        </a>
      </div>
      <div class="flex gap-x-6 lg:gap-x-12">
        <router-link
          v-for="item in navigation"
          :key="item.href"
          :to="item.href"
          class="text-sm font-semibold leading-6 text-gray-900">
          {{ item.name }}
        </router-link>
      </div>
      <div class="flex flex-col items-end lg:flex-1 lg:justify-end">
        <span class="text-indigo-600 select-none">{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
        <button @click="logout" class="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500">Log out</button>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_USER_INFO } from '@/store/modules/auth/auth.types';

export default {
  name: 'Header',
  computed: {
    ...mapGetters({ GET_USER_INFO }),
    currentUser() {
      return this.GET_USER_INFO;
    },
  },
  data() {
    return {
      navigation: [
        { name: 'Home', href: '/' },
        { name: 'Users', href: '/users' },
        { name: 'Profile', href: '/profile' },
      ],
      mobileMenuOpen: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('accessToken');
      this.$router.push('/login');
    },
  },

};
</script>

<style scoped>

</style>
