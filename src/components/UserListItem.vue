<template>
   <li>
      <div class="select-none block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
        <div class="flex items-center px-4 py-4 sm:px-6">
          <div class="min-w-0 flex-1 flex items-center">
            <div class="flex-shrink-0">
              <img class="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
            </div>
            <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <div class="text-sm leading-5 font-medium text-indigo-600 truncate">{{ user.firstName }} {{ user.lastName }}</div>
                <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                  <!-- Heroicon name: mail -->
                  <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span class="truncate">{{ user.email }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="inline-flex gap-3">
            <span class="inline-flex rounded-md shadow-sm sm:w-auto">
            <button v-if="+user.id !== +currentUserId" @click="handleFollow" type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none
              focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
              {{ follow  ? 'Unfollow': 'Follow'}}
            </button>
          </span>
          <span class="inline-flex rounded-md shadow-sm sm:w-auto">
            <button @click="goToUser" type="button" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded-full text-gray-700 bg-white hover:text-gray-500 focus:outline-none
              focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
              <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </span>
          </div>
        </div>
      </div>
    </li>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    user: {
      required: true,
      type: Object,
    },
    follow: {
      required: true,
      type: Boolean,
    },
    currentUserId: {
      required: true,
      type: Number,
    },
  },
  methods: {
    goToUser() {
      if (+this.user.id === +this.currentUserId) this.$router.push('/profile');
      else this.$router.push(`/users/${this.user.id}`);
    },
    handleFollow() {
      this.$emit('handleFollow', this.post);
    },
  },
};
</script>

<style>

</style>
