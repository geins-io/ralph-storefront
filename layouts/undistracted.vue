<template>
  <div class="ca-layout-undistracted">
    <LazyCaGlobalMessage v-if="$store.state.ancientBrowser">
      {{ $t('ANCIENT_BROWSER_MESSAGE') }}
    </LazyCaGlobalMessage>
    <CaTopBar :undistracted="true" />
    <main class="ca-layout-undistracted__main">
      <Nuxt />
    </main>
    <CaCookieConsent ref="cookieConsent" />
    <LazyCaAccountPanel />
  </div>
</template>
<script>
import MixGlobalInit from 'MixGlobalInit';
export default {
  name: 'CaUndistractedLayout',
  mixins: [MixGlobalInit],
  data: () => ({}),
  // IMPORTANT NOTICE: If you decide to add a head() function here, you will overwrite default meta functionality that comes with MixGlobalInit from Ralph UI
};
</script>
<style lang="scss">
@import './styles/layouts/undistracted-layout';
</style>
