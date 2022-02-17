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
.ca-header {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: $z-index-header;
  &__bar {
    background: $c-header-bg;
    z-index: $z-index-header;
    position: relative;
    body[style='overflow: hidden;'] & {
      padding-right: var(--scrollbar-width);
    }
  }
  &__container {
    height: $header-bar-height;
    @include flex-valign;
    justify-content: space-between;

    @include bp(laptop) {
      justify-content: flex-end;
      height: $header-bar-height-computer;
    }
  }

  &__nav-toggle {
    margin-right: auto;
    @include flex-valign;
    font-size: 28px;
  }

  &__search-toggle {
    margin-right: auto;
    font-size: 23px;
    @include flex-valign;
  }

  &__logo {
    @include calign;
    width: 120px;
  }

  &--scrolled & {
    &__nav-toggle {
      margin-right: $px20;
    }
  }

  .ca-notification-badge {
    border: 1px solid $c-header-bg;
  }
}
</style>
