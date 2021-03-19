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
              name: 'mobile-nav'
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
    <nav class="ca-navigation only-computer">
      <ul
        v-if="topLevelCategories && topLevelCategories.length > 0"
        class="ca-navigation__categories"
      >
        <li
          v-for="(category, index) in topLevelCategories"
          :key="index"
          class="ca-navigation__item"
        >
          <NuxtLink class="ca-navigation__link" :to="'/c/' + category.alias">
            <CaIconAndText
              v-if="getSubLevelCategories(category.categoryId).length"
              icon-name="chevron-down"
              icon-position="right"
            >
              {{ category.name }}
            </CaIconAndText>
            <span v-else>{{ category.name }}</span>
          </NuxtLink>
          <ul
            v-if="getSubLevelCategories(category.categoryId).length"
            class="ca-navigation__sub-menu"
          >
            <li
              v-for="(subcategory, subindex) in getSubLevelCategories(
                category.categoryId
              )"
              :key="subindex"
              class="ca-navigation__sub-menu-item"
            >
              <NuxtLink :to="'/c/' + subcategory.alias">
                {{ subcategory.name }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <CaSearch class="only-mobile" :opened="searchOpened" />
    <LazyCaContentPanel name="mobile-nav" enter-from="left">
      <template #header>
        <CaLogo class="ca-navigation-logo" :alt="$t('LOGO_ALT_TEXT')" />
      </template>
      <CaNavigationSlim
        v-if="categories && categories.length"
        :categories="categories"
      />
      <template #footer>
        <ul class="secondary-nav">
          <CaSecondaryNavItem>
            <button
              v-if="!$store.getters['auth/isAuthenticated']"
              type="button"
              @click="
                $store.commit('contentpanel/open', {
                  name: 'account',
                  frame: 'login'
                })
              "
            >
              {{ $t('LOG_IN') }}/{{ $t('CREATE_ACCOUNT') }}
            </button>
            <NuxtLink v-else :to="localePath('account-orders')">
              {{ $t('ACCOUNT_TITLE') }}
            </NuxtLink>
          </CaSecondaryNavItem>
          <CaSecondaryNavItem>
            <NuxtLink to="/">
              {{ $t('FAVORITES_LABEL') }} ({{
                $store.state.favorites.length
              }})</NuxtLink
            >
          </CaSecondaryNavItem>
          <CaSecondaryNavItem>
            <NuxtLink
              v-for="locale in availableLocales"
              :key="locale.code"
              :to="switchLocalePath(locale.code)"
            >
              <CaFlag
                class="ca-top-bar__flag"
                :country="locale.flag"
                shape="circle"
              />
              {{ locale.name }}
            </NuxtLink>
          </CaSecondaryNavItem>
        </ul>
      </template>
    </LazyCaContentPanel>
  </header>
</template>
<script>
import categoriesQuery from 'global/categories.graphql';

export default {
  name: 'CaHeader',
  apollo: {
    categories: {
      query: categoriesQuery,
      variables() {
        return {
          apiKey: this.$config.apiKey.toString()
        };
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  mixins: [],
  props: {},
  data: () => ({
    searchOpened: false,
    subNavsOpen: []
  }),
  computed: {
    modifiers() {
      return {
        'ca-header--scrolled': !this.$store.getters.siteIsAtTop
      };
    },
    activeCategories() {
      return this.categories
        ? this.categories.filter(item => item.activeProducts !== 0)
        : [];
    },
    topLevelCategories() {
      return this.categories
        ? this.activeCategories.filter(i => i.parentCategoryId === 0)
        : [];
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    }
  },
  watch: {},
  mounted() {},
  methods: {
    getSubLevelCategories(id) {
      return this.activeCategories.filter(i => i.parentCategoryId === id);
    },
    toggleSubNav(categoryId) {
      if (this.subNavsOpen.includes(categoryId)) {
        this.subNavsOpen.splice(this.subNavsOpen.indexOf(categoryId), 1);
      } else this.subNavsOpen.push(categoryId);
    },
    getToggleIcon(categoryId) {
      if (this.subNavsOpen.includes(categoryId)) {
        return 'minus';
      } else return 'plus';
    }
  }
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
.ca-navigation {
  height: 40px;
  background: $c-header-bg;
  body[style='overflow: hidden;'] & {
    padding-right: var(--scrollbar-width);
  }
  a {
    display: block;
  }
  &__categories {
    @include flex-halign;
  }
  &__link {
    font-size: $font-size-m;
    padding: 0 $px32;
  }

  &__sub-menu {
    opacity: 0;
    pointer-events: none;
    margin-top: -20px;
    position: absolute;
    width: 150px;
    border-top: 0.9rem solid transparent;
    transition: all 200ms ease;
  }
  &__item {
    position: relative;
    &:hover {
      .ca-navigation__sub-menu {
        pointer-events: initial;
        margin-top: 0;
        opacity: 1;
      }
    }
  }
  &__sub-menu-item {
    background: $c-medium-gray;
    padding: $px12;
    &:not(:last-child) {
      padding-bottom: $px4;
    }
    &:not(:first-child) {
      padding-top: $px4;
    }
  }
}

.ca-navigation-logo {
  width: 100px;
}
</style>
