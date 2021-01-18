<template>
  <div class="ca-layout-default" :class="modifiers">
    <CaHeader />
    <main class="ca-layout-default__main">
      <Nuxt />
    </main>
    <CaFooter />
    <client-only>
      <transition name="fade">
        <div
          v-if="$apollo.loading || $store.state.loading.loading"
          class="ca-layout-default__loading"
        >
          <CaSpinner
            class="ca-layout-default__spinner"
            :loading="$apollo.loading || $store.state.loading.loading"
          />
        </div>
      </transition>
    </client-only>
    <CaDisplayCart />
    <CaAccountPanel />
    <CaSnackbar />
  </div>
</template>
<script>
import CaHeader from 'CaHeader';
import CaFooter from 'CaFooter';
import MixGlobalInit from 'MixGlobalInit';
const CaDisplayCart = () => ({
  component: import('CaDisplayCart')
});
const CaAccountPanel = () => ({
  component: import('CaAccountPanel')
});
const CaSpinner = () => ({
  component: import('CaSpinner')
});
const CaSnackbar = () => ({
  component: import('CaSnackbar')
});

export default {
  name: 'CaDefaultLayout',
  components: {
    CaHeader,
    CaSpinner,
    CaSnackbar,
    CaFooter,
    CaDisplayCart,
    CaAccountPanel
  },
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
    padding-top: $header-height + $default-spacing;
    @include bp(laptop) {
      padding-top: $header-height-computer + $default-spacing * 2;
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
