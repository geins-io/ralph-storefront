<template>
  <div class="ca-layout-default" :class="modifiers">
    <CaHeader />
    <main class="ca-layout-default__main">
      <Nuxt />
    </main>
    <div>
      <LazyHydrate when-visible>
        <CaFooter />
      </LazyHydrate>
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
      <LazyCaMenuPanel menu-location-id="main-mobile" />
      <LazyCaSnackbar />
      <LazyCaModal />
      <LazyCaAddedToCart />
    </div>
  </div>
</template>
<script>
import MixGlobalInit from 'MixGlobalInit';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'CaDefaultLayout',
  components: {
    LazyHydrate
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
  @import 'organisms/ca-layout-default';
</style>
