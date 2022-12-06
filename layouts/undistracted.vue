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
import listPageInfo from 'global/list-page-info.graphql';
export default {
  name: 'CaUndistractedLayout',
  mixins: [MixGlobalInit],
  apollo: {
    listPageInfo: {
      query: listPageInfo,
      errorPolicy: 'all',
      result(result) {
        if (result && result.data.length) {
          this.listPageInfo = result.data;
        }
      }
    }
  },
  data: () => ({
    listPageInfo: null
  }),
  head() {
    return {
      title: this.listPageInfo.meta.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.listPageInfo.meta.description
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@import 'organisms/ca-layout-undistracted';
</style>
