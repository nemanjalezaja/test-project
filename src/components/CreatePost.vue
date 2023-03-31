<template>
  <div class="flex items-start space-x-4 mb-6 p-2 w-full md:w-8/12 lg:w-full mx-auto">
    <div class="flex-shrink-0">
      <img class="inline-block h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
    </div>
    <div class="min-w-0 flex-1">
      <form action="#" @submit.prevent="submitPost">
        <div class="border-b border-gray-200 focus-within:border-indigo-600">
          <label for="comment" class="sr-only">Whats on your mind...</label>
          <textarea v-model="text" rows="3" name="comment" id="comment" class="px-2 block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Whats on your mind..." />
        </div>
        <div class="flex justify-end pt-2">
          <div class="flex-shrink-0">
            <button type="submit" class="inline-flex items-center px-2.5 py-1.5 border text-xs leading-4 font-medium rounded bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none
              focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { CREATE_POST } from '@/store/modules/posts/posts.types';

export default {
  name: 'CreatePost',
  data() {
    return {
      text: '',
    };
  },
  methods: {
    submitPost() {
      // TODO add loader, remove loader after response, notify for error message...
      this.$store.dispatch(CREATE_POST, this.text).then(() => {
        this.text = '';
      }).catch();
    },
  },
};
</script>

<style>

</style>
