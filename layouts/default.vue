<template>
  <div class="ca-layout-default" :class="modifiers">
    <CaCountrySelectorPanel v-if="$config.countrySelectorPanelVisible" />
    <CaHeader
      :class="{
        'county-selector-visible': $config.countrySelectorPanelVisible
      }"
    />
    <main
      class="ca-layout-default__main"
      :class="{
        'county-selector-visible': $config.countrySelectorPanelVisible
      }"
    >
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
      <LazyCaSnackbar />
      <LazyCaModal />
      <LazyCaAddedToCart />
    </div>
  </div>
</template>
<script>
import MixGlobalInit from 'MixGlobalInit';
import listPageInfo from 'global/list-page-info.graphql';

export default {
  name: 'CaDefaultLayout',
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
  computed: {
    modifiers() {
      return {
        'ca-layout-default--loading': this.$store.state.loading.loading
      };
    }
  },
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
@import 'organisms/ca-layout-default';
</style>
