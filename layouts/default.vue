<template>
  <div class="ca-layout-default" :class="modifiers">
    <CaHeader />
    <main class="ca-layout-default__main">
      <Nuxt />
    </main>
    <CaFooter />
    <client-only>
      <transition name="fade">
        <div v-if="globalLoading" class="ca-layout-default__loading">
          <CaSpinner class="ca-layout-default__spinner" />
        </div>
      </transition>
    </client-only>
    <CaCookieConsent />
    <LazyCaDisplayCart />
    <LazyCaAccountPanel />
    <LazyCaSnackbar />
    <LazyCaModal />
    <LazyCaAddedToCart />
  </div>
</template>
<script>
import MixGlobalInit from 'MixGlobalInit';

export default {
  name: 'CaDefaultLayout',
  mixins: [MixGlobalInit],
  computed: {
    modifiers() {
      return {
        'ca-layout-default--loading': this.$store.state.loading.loading
      };
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.ca-layout-default {
  $block: &;
  &__main {
    padding-top: $header-height + $px12;
    @include bp(laptop) {
      padding-top: $header-height-computer + $default-spacing;
    }
  }
  &__loading {
    @include halign;
    position: fixed;
    top: $header-bar-height + $top-bar-height + $px12;
    z-index: $z-index-panel;
    background: $c-darkest-gray;
    padding: $px8;
    width: rem-calc(36px);
    height: rem-calc(36px);
    border-radius: 50%;
    @include bp(laptop) {
      top: $header-height-computer + $default-spacing;
    }
  }
  &--loading {
    #{$block}__main {
      min-height: 100vh;
    }
  }
}
</style>
