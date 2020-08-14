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
import MixGlobalInit from 'MixGlobalInit';
export default {
  components: {
    CaTopBar
  },
  mixins: [MixGlobalInit]
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
