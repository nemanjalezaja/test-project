<template>
  <div class="flex min-h-full">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <div>
            <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Twitter Copy" />
            <h3 class="text-center font-medium text-indigo-200">Twitter Clone</h3>
          </div>
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register your account</h2>
        </div>

        <div class="mt-16">
          <div class="space-y-6">
            <div>
              <label for="firstName" class="block text-sm font-medium text-left ml-1 leading-6 text-gray-900">First name</label>
              <div class="mt-1">
                <input id="firstName" name="firstName" type="text" autocomplete="firstName" required="" v-model="firstName"
                class="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-left ml-1 leading-6 text-gray-900">Last name</label>
              <div class="mt-1">
                <input id="lastName" name="lastName" type="text" autocomplete="lastName" required="" v-model="lastName"
                class="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-left ml-1 leading-6 text-gray-900">Email address</label>
              <div class="mt-1">
                <input id="email" name="email" type="email" autocomplete="email" required="" v-model="email"
                class="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="space-y-1">
              <label for="password" class="block text-sm font-medium text-left ml-1 leading-6 text-gray-900">Password</label>
              <div class="mt-1">
                <input id="password" name="password" type="password" autocomplete="current-password" required="" v-model="password"
                class="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button @click="registerUser" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Register account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
    </div>
  </div>
</template>

<script>
import { REGISTER_USER } from '@/store/modules/auth/auth.types';

export default {
  name: 'Register',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async registerUser() {
      // TODO validation
      const {
        firstName, lastName, email, password,
      } = this;

      // TODO hash password
      this.$store.dispatch(REGISTER_USER, {
        firstName, lastName, email, password, followers: [], following: [],
      }).then(() => {
        this.$router.push('/login');
        this.$toast.success('YEEA!');
      }).catch(() => {
        this.$toast.error('OPS ERROR MESSAGE!');
      });
    },
  },

};
</script>

<style>

</style>
