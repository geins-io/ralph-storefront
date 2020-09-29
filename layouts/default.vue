<template>
  <div class="ca-layout-default">
    <CaHeader />
    <CaSnackbar />
    <div class="ca-main">
      <Nuxt />
    </div>
    <transition name="fade">
      <div v-if="$apollo.loading" class="ca-layout-default__loading">
        <CaSpinner
          class="ca-layout-default__spinner"
          :loading="$apollo.loading"
        />
      </div>
    </transition>
  </div>
</template>
<script>
import CaHeader from 'CaHeader';
import MixGlobalInit from 'MixGlobalInit';
import CaSpinner from 'CaSpinner';
import CaSnackbar from 'CaSnackbar';

export default {
  name: 'CaDefaultLayout',
  components: {
    CaHeader,
    CaSpinner,
    CaSnackbar
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
  &__loading {
    @include halign;
    position: fixed;
    bottom: 20px;
    z-index: $z-index-panel;
    background: $c-darkest-gray;
    padding: $px8;
    border-radius: 50%;
  }
}
</style>
