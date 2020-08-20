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
    <nav class="ca-navigation only-desktop">
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
    <CaSearch v-if="!$store.getters.viewportLaptop" :opened="searchOpened" />
  </div>
</template>
<script>
import gql from 'graphql-tag';
import CaLogo from 'CaLogo';
import CaIconAndText from 'CaIconAndText';
import CaContainer from 'CaContainer';
import CaIcon from 'CaIcon';
import CaMiniCart from 'CaMiniCart';
import CaFavorites from 'CaFavorites';
import CaSearch from 'CaSearch';
import CaTopBar from 'CaTopBar';

export default {
  name: 'CaHeader',
  apollo: {
    categories: {
      query: gql`
        query categories($apiKey: String!) {
          categories(apiKey: $apiKey) {
            alias
            name
            categoryId
            parentCategoryId
            activeProducts
          }
        }
      `,
      variables() {
        return {
          apiKey: this.$store.getters.currentApiKey
        };
      }
    }
  },
  components: {
    CaTopBar,
    CaContainer,
    CaIcon,
    CaIconAndText,
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
    }
  },
  watch: {},
  mounted() {},
  methods: {
    getSubLevelCategories(id) {
      return this.activeCategories.filter(i => i.parentCategoryId === id);
    }
  }
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
</style>
