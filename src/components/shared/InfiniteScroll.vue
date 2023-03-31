<!--
    "scrollDisabled" infinite scroll will be disabled if the value of this attribute is true.
    "bottomDistance" the minimum distance between the bottom of the element and the bottom of
     the viewport before the infinite-scroll method is executed.
    "infiniteScroll" method to be executed when scroll reaches bottomDistance
 -->
<template>
  <div class="infinite_scroll" ref="infinite_scroll">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'InfiniteScroll',
  props: {
    scrollDisabled:
      {
        type: Boolean,
        default: false,
      },
    bottomDistance:
      {
        type: Number,
        default: 0,
      },
  },
  mounted() {
    this.$refs.infinite_scroll.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    this.$refs.infinite_scroll.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll(e) {
      if (this.scrollDisabled) return;
      if (e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + this.bottomDistance) {
        this.$emit('infiniteScroll', true);
      }
    },
  },
};
</script>
<style>
.infinite_scroll {
  position: absolute;
  inset: 0;
  overflow-y: overlay;
}
</style>
