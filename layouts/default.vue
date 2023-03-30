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
      <LazyCaMarketPanel
        v-if="$store.state.channel.markets.length > 1"
        mode="advanced"
      />
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
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-layout-default--loading': this.$store.state.loading.loading
      };
    }
  }
  // IMPORTANT NOTICE: If you decide to add a head() function here, you will overwrite default meta functionality that comes with MixGlobalInit from Ralph UI
};
</script>
<style lang="scss">
@import 'organisms/ca-layout-default';
</style>
