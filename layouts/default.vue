<template>
  <div class="ca-layout ca-layout--default">
    <CaHeader />
    <div class="ca-main">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import CaHeader from '@/components/organisms/CaHeader/CaHeader';
export default {
  components: {
    CaHeader
  },
  mounted() {
    this.$store.dispatch('initScrollListener');

    this.$store.commit('setViewportWidth');
    this.$store.dispatch('initResizeListener');
  }
};
</script>
<style lang="scss">
.ca-main {
  padding-top: $header-height + $default-spacing;
  @include bp(laptop) {
    padding-top: $header-height-desktop + $default-spacing * 2;
  }
}
</style>
