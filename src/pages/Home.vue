<template>
  <div class="relative w-full lg:w-8/12 xl:w-6/12 mx-auto flex-grow">
    <InfiniteScroll
      :scrollDisabled="postsLoader"
      @infiniteScroll="loadMore"
      :bottomDistance="200"
      class="flex flex-col">
      <span class="mx-auto mb-6 py-4 px-12 relative z-0 inline-flex shadow-sm rounded-md">
        <button @click="following = false" type="button" class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5
          font-medium focus:z-10focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          :class="{'bg-indigo-600 text-white hover:text-white hover:bg-indigo-500': !following}">
          SHOW ALL USER POSTS
        </button>
        <button @click="following = true" type="button" class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5
          font-medium focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          :class="{'bg-indigo-600 text-white hover:text-white hover:bg-indigo-500': following}">
          SHOW ONLY FOLLOWING
        </button>
      </span>
      <CreatePost />
      <div v-for="post in posts" :key="post.id" class="w-full md:w-8/12 lg:w-full mx-auto">
        <Post :post="post" :user="currentUser" @handleFollow="handleFollow" @handleLike="handleLike" :follow="currentUser.following.includes(post.authorId)"/>
      </div>
    </InfiniteScroll>
  </div>
</template>

<script>
import { sortBy, filter } from 'lodash';
import { mapGetters } from 'vuex';
import { GET_STATE, SET_STATE } from '@/store/index.types';
import { GET_USER_INFO } from '@/store/modules/auth/auth.types';
import { FETCH_POSTS, LIKE_POST } from '@/store/modules/posts/posts.types';
import { FETCH_USERS, FOLLOW_USER, GET_USER_BY_ID } from '@/store/modules/users/users.types';
import Post from '@/components/Post.vue';
import CreatePost from '@/components/CreatePost.vue';

export default {
  name: 'Home',
  components: { Post, CreatePost },
  created() {
    this.$store.dispatch(FETCH_POSTS).then(() => {
      // TODO stop loader show posts
    }).catch(() => {
      // TODO err message?, and/or loader stoper ....
    });
    this.$store.dispatch(FETCH_USERS).then(() => {
      // TODO stop loader show posts
    }).catch(() => {
      // TODO err message?, and/or loader stoper ....
    });
  },
  data() {
    return {
      postsLoader: false,
      following: false,
    };
  },
  computed: {
    ...mapGetters({ GET_STATE, GET_USER_INFO, GET_USER_BY_ID }),
    posts() {
      const list = sortBy(this.GET_STATE('posts', 'posts'), 'createdAt');
      if (this.following) return filter(list, (post) => this.currentUser.following.includes(post.authorId));
      return list;
    },
    currentUser() {
      return this.GET_USER_INFO;
    },
  },
  methods: {
    loadMore() {
      // TODO add more in array of posts
    },
    handleFollow(post) {
      const user = this.GET_USER_BY_ID(+post.authorId);
      // handle loader, error message ....
      this.$store.dispatch(FOLLOW_USER, user).then().catch();
    },
    handleLike(post) {
      this.$store.dispatch(LIKE_POST, { ...post }).then().catch();
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
  },
};
</script>

<style>

</style>
