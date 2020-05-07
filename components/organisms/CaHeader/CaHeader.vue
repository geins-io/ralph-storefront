<template>
  <div class="ca-header" :class="modifiers">
    <CaTopBar />
    <div class="ca-header__bar">
      <CaContainer class="ca-header__container">
        <a href="javascript:;" class="ca-header__nav-toggle only-mobile">
          <CaIcon class="ca-header__nav-toggle-icon" name="menu" />
        </a>
        <a
          v-if="!$store.getters.siteIsAtTop && !$store.getters.viewportLaptop"
          href="javascript:;"
          class="ca-header__search-toggle"
          @click="() => (searchOpened = !searchOpened)"
        >
          <CaIcon class="ca-header__search-toggle-icon" name="search" />
        </a>
        <CaSearch class="only-desktop" />
        <a href="/">
          <CaLogo class="ca-header__logo" :alt="$t('LOGO_ALT_TEXT')" />
        </a>
        <CaFavorites class="ca-header__favorites" />
        <CaMiniCart class="ca-header__cart" />
      </CaContainer>
    </div>
    <div class="ca-navigation only-desktop">
      <NuxtLink class="ca-navigation__link" to="/list">
        {{ $t('PRODUCT_LIST') }}
      </NuxtLink>
      <NuxtLink class="ca-navigation__link" to="/">
        Nav link
      </NuxtLink>
      <NuxtLink class="ca-navigation__link" to="/">
        Nav link
      </NuxtLink>
      <NuxtLink class="ca-navigation__link" to="/">
        Nav link
      </NuxtLink>
    </div>
    <CaSearch v-if="!$store.getters.viewportLaptop" :opened="searchOpened" />
  </div>
</template>
<script>
import {
  CaContainer,
  CaIcon,
  CaLogo,
  CaMiniCart,
  CaFavorites,
  CaSearch
} from '@ralph/ralph-ui';
import CaTopBar from '@/components/organisms/CaTopBar/CaTopBar';

export default {
  name: 'CaHeader',
  components: {
    CaTopBar,
    CaContainer,
    CaIcon,
    CaLogo,
    CaMiniCart,
    CaFavorites,
    CaSearch
  },
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
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
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
  }
  &__container {
    height: $header-bar-height;
    @include flex-valign;
    justify-content: space-between;

    @include bp(laptop) {
      justify-content: flex-end;
      height: $header-bar-height-desktop;
    }
  }

  &__nav-toggle {
    margin-right: auto;
    @include flex-valign;
  }
  &__nav-toggle-icon {
    font-size: 28px;
  }

  &__search-toggle {
    margin-right: auto;
    @include flex-valign;
  }

  &__search-toggle-icon {
    font-size: 23px;
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

  ::v-deep .ca-notification-badge {
    border: 1px solid $c-header-bg;
  }
}
.ca-navigation {
  height: 40px;
  background: $c-header-bg;
  @include flex-halign;
  &__link {
    font-size: $font-size-m;
    padding: 0 $px32;
  }
}
</style>
