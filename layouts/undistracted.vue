<template>
  <div class="ca-layout-undistracted">
    <CaGlobalMessage v-if="$store.state.ancientBrowser">
      {{ $t('ANCIENT_BROWSER_MESSAGE') }}
    </CaGlobalMessage>
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
  mixins: [MixGlobalInit]
};
</script>
<style lang="scss">
  @import 'organisms/ca-layout-undistracted';
</style>
