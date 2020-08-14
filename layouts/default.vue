<template>
  <div class="ca-layout-default">
    <CaHeader />
    <div class="ca-main">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import CaHeader from 'CaHeader';
import MixGlobalInit from 'MixGlobalInit';
export default {
  components: {
    CaHeader
  },
  mixins: [MixGlobalInit]
};
</script>
<style lang="scss">
.ca-layout-default {
  .ca-main {
    padding-top: $header-height + $default-spacing;
    @include bp(laptop) {
      padding-top: $header-height-desktop + $default-spacing * 2;
    }
  }
}
</style>
