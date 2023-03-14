<template>
  <header class="ca-header" :class="modifiers">
    <CaGlobalMessage v-if="$store.state.ancientBrowser">
      {{ $t('ANCIENT_BROWSER_MESSAGE') }}
    </CaGlobalMessage>
    <CaTopBar />
    <div class="ca-header__bar">
      <CaContainer class="ca-header__container" design="full-width">
        <CaIconButton
          class="ca-header__nav-toggle only-mobile"
          icon-name="menu"
          aria-label="Show menu"
          @clicked="$store.commit('contentpanel/open', { name: 'menu-panel' })"
        />

        <NuxtLink class="ca-header__logo-link" :to="$getPath('index')">
          <CaLogo class="ca-header__logo" :alt="$t('LOGO_ALT_TEXT')" />
        </NuxtLink>

        <CaSearch class="only-computer" />

        <div class="ca-header__actions">
          <CaIconButton
            v-if="
              isPdp &&
                ($store.getters.viewport === 'phone' ||
                  $store.getters.viewport === 'tablet')
            "
            class="ca-header__search-toggle"
            icon-name="search-header"
            aria-label="Show search"
            @clicked="() => (searchOpened = !searchOpened)"
          />

          <button
            v-if="!$store.getters['auth/authenticated']"
            type="button"
            class="ca-header__link ca-header__link--login"
            @click="
              $store.commit('contentpanel/open', {
                name: 'account',
                frame: 'login'
              })
            "
          >
            <CaIconAndText icon-name="user">
              {{ $t('LOG_IN') }}/{{ $t('CREATE_ACCOUNT') }}
            </CaIconAndText>
          </button>
          <NuxtLink
            v-else
            class="ca-header__link ca-header__link--login"
            :to="localePath('account-orders')"
          >
            <CaIconAndText icon-name="user">
              {{ $t('ACCOUNT_TITLE') }}
            </CaIconAndText>
          </NuxtLink>

          <CaFavorites :show-text="false" class="ca-header__favorites" />

          <CaMiniCart class="ca-header__cart" />
        </div>
      </CaContainer>
    </div>
    <CaHeaderNavigation
      class="only-computer"
      menu-location-id="main-desktop"
      menu-state="click"
    />
    <CaSearch
      class="only-mobile"
      :opened="searchOpened"
      :is-pdp="isPdp"
      @closed="searchOpened = false"
    />
  </header>
</template>
<script>
/*
  Header component for the site.
*/
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
        'ca-header--scrolled': !this.$store.getters.siteIsAtTop,
        'ca-header--is-hidden': this.$store.state.headerHidden,
        'ca-header--pdp': this.isPdp
      };
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    },
    isPdp() {
      return this.$route.name.includes('pdp');
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
