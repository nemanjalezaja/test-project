<template>
  <div class="bg-gray-50 overflow-hidden sm:rounded-lg my-6">
  <div class="px-4 py-5 sm:p-6">
    <!-- Content goes here -->
    <div class="flex items-start space-x-4">
      <div class="w-2/12 flex flex-col items-center">
        <img class="inline-block h-12 w-12 rounded-full mb-3" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        <button type="button" @click="handleFollow" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none
          focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
          {{ follow  ? 'Unfollow': 'Follow'}}
        </button>
      </div>
      <div class="w-10/12 border-b flex flex-col">
        <div class="flex items-end justify-between border-b px-3">
          <h5 class="">{{ post.author }}</h5>
          <span class="text-xs text-gray-400">{{ post.createdAt | momentToDate }}</span>
        </div>
        <div class="w-full  mx-px mt-px px-3 pb-12 pt-2 text-sm leading-5 text-gray-800">
          {{ post.text }}
        </div>
      </div>
    </div>
      <div class="flex items-center justify-end">
        <button type="button" @click="handleLike" class="mt-3 inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded-full text-gray-700 bg-white hover:text-gray-500 focus:outline-none
          focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
          <ThumbsUp :liked="liked" />
        </button>
      </div>
  </div>
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, similique.
</div>
</template>

<script>
import ThumbsUp from '@/components/icons/thumbsUp.vue';

export default {
  name: 'Post',
  components: { ThumbsUp },
  props: {
    post: {
      required: true,
      type: Object,
    },
    user: {
      required: true,
      type: Object,
    },
    follow: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    liked() {
      return this.post.likedBy.includes(this.user.id);
    },
  },
  methods: {
    handleFollow() {
      this.$emit('handleFollow', this.post);
    },
    handleLike() {
      this.$emit('handleLike', this.post);
    },
  },

};
</script>

<style>

</style>
