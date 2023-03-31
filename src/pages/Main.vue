<template>
<div class="max-h-screen h-full flex flex-col">
  <Header />
  <router-view></router-view>
</div>
</template>

<script>
import Header from '@/components/shared/Header.vue';

export default {
  name: 'Main',
  components: { Header },
};
</script>

<style>

</style>
