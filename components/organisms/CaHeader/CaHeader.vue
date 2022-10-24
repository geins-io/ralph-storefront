<template>
  <header class="ca-header" :class="modifiers">
    <CaGlobalMessage v-if="$store.state.ancientBrowser">
      {{ $t('ANCIENT_BROWSER_MESSAGE') }}
    </CaGlobalMessage>
    <CaTopBar />
    <div class="ca-header__bar">
      <CaContainer class="ca-header__container">
        <CaIconButton
          class="ca-header__nav-toggle only-mobile"
          icon-name="menu"
          aria-label="Show menu"
          @clicked="
            $store.commit('contentpanel/open', {
              name: 'menu-panel'
            })
          "
        />
        <CaIconButton
          v-if="!$store.getters.siteIsAtTop && !$store.getters.viewportComputer"
          class="ca-header__search-toggle"
          icon-name="search"
          aria-label="Show search"
          @clicked="() => (searchOpened = !searchOpened)"
        />
        <CaSearch class="only-computer" />
        <NuxtLink to="/">
          <CaLogo class="ca-header__logo" :alt="$t('LOGO_ALT_TEXT')" />
        </NuxtLink>
        <CaFavorites class="ca-header__favorites" />
        <CaMiniCart class="ca-header__cart" />
      </CaContainer>
    </div>
    <CaHeaderNavigation class="only-computer" menu-location-id="main-desktop" />
    <CaSearch class="only-mobile" :opened="searchOpened" />
  </header>
</template>
<script>
export default {
  name: 'CaHeader',
  mixins: [],
  props: {},
  data: () => ({
    searchOpened: false
  }),
  computed: {
    modifiers() {
      return {
        'ca-header--scrolled': !this.$store.getters.siteIsAtTop
      };
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
  @import 'organisms/ca-header';
</style>
