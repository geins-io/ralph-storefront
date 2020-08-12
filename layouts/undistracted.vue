<template>
  <div class="ca-layout-undistracted">
    <CaTopBar :undistracted="true" />
    <div class="ca-main">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import CaTopBar from 'CaTopBar';
export default {
  components: {
    CaTopBar
  },
  mounted() {
    this.$store.dispatch('initScrollListener');

    this.$store.commit('setViewportWidth');
    this.$store.dispatch('initResizeListener');
  }
};
</script>
<style lang="scss">
.ca-layout-undistracted {
  background: $c-light-gray;
  min-height: 100vh;
  .ca-main {
    padding-top: rem-calc(15px);
    @include bp(laptop) {
      padding-top: $default-spacing * 2;
    }
  }
  .ca-top-bar__usps {
    @include bp(laptop) {
      @include calign;
    }
  }
}
</style>
