<template>
  <div class="ca-layout-default">
    <CaHeader />
    <main class="ca-main">
      <Nuxt />
    </main>
    <CaFooter />
    <transition name="fade">
      <div
        v-if="$apollo.loading || $store.state.loading"
        class="ca-layout-default__loading"
      >
        <CaSpinner
          class="ca-layout-default__spinner"
          :loading="$apollo.loading || $store.state.loading"
        />
      </div>
    </transition>
    <CaDisplayCart />
    <CaSnackbar />
  </div>
</template>
<script>
import CaHeader from 'CaHeader';
import CaFooter from 'CaFooter';
import CaDisplayCart from 'CaDisplayCart';
import MixGlobalInit from 'MixGlobalInit';
import CaSpinner from 'CaSpinner';
import CaSnackbar from 'CaSnackbar';

export default {
  name: 'CaDefaultLayout',
  components: {
    CaHeader,
    CaSpinner,
    CaSnackbar,
    CaFooter,
    CaDisplayCart
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
    top: $header-bar-height + $top-bar-height + $px12;
    z-index: $z-index-panel;
    background: $c-darkest-gray;
    padding: $px8;
    border-radius: 50%;
    @include bp(laptop) {
      top: $header-height-desktop + $default-spacing;
    }
  }
}
</style>
