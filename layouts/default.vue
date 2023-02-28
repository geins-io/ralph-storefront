<template>
  <div class="ca-layout-default" :class="modifiers">
    <CaHeader />
    <main class="ca-layout-default__main">
      <Nuxt />
    </main>
    <div>
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
      <LazyCaMenuPanel menu-location-id="main-mobile" />
      <LazyCaMarketPanel />
      <LazyCaSnackbar />
      <LazyCaModal />
      <LazyCaAddedToCart />
    </div>
  </div>
</template>
<script>
import MixGlobalInit from 'MixGlobalInit';

export default {
  name: 'CaDefaultLayout',
  mixins: [MixGlobalInit],
  apollo: {},
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-layout-default--loading': this.$store.state.loading.loading
      };
    }
  }
};
</script>
<style lang="scss">
@import 'organisms/ca-layout-default';
</style>
