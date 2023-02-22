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
          @clicked="$store.commit('contentpanel/open', { name: 'menu-panel' })"
        />

        <NuxtLink class="ca-header__logo-link" :to="localePath('index')">
          <CaLogo class="ca-header__logo" :alt="$t('LOGO_ALT_TEXT')" />
        </NuxtLink>

        <CaSearch class="only-computer" />

        <div class="ca-header__actions">
          <CaIconButton
            v-if="!$store.getters.siteIsAtTop && !$store.getters.viewportComputer"
            class="ca-header__search-toggle"
            icon-name="search-header"
            aria-label="Show search"
            @clicked="() => (searchOpened = !searchOpened)"
          />

          <CaFavorites class="ca-header__favorites" />

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

          <CaMiniCart class="ca-header__cart" />
        </div>
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
