<template>
  <div class="ca-favorites-page">
    <CaContainer>
      <h1 class="ca-favorites-page__title">{{ $t('FAVORITES_LABEL') }}</h1>
      <CaProductList
        v-if="$store.state.favorites.length > 0"
        class="ca-favorites-page__list"
        :products="allProducts"
        :page-size="$store.state.favorites.length"
      />
      <p v-else class="ca-favorites-page__empty">
        {{ $t('FAVORITES_EMPTY') }}
      </p>
    </CaContainer>
  </div>
</template>

<script>
import productsQuery from 'productlist/products.graphql';
export default {
  name: 'FavoritesPage',
  apollo: {
    products: {
      query: productsQuery,
      variables() {
        return {
          filter: this.filter,
          take: this.$store.state.favorites.length
        };
      },
      errorPolicy: 'all',
      result() {
        this.$store.dispatch('loading/end');
      },
      error(error) {
        this.$nuxt.error({ statusCode: 500, message: error });
      }
    }
  },
  data: () => ({}),
  computed: {
    allProducts() {
      return this.products ? this.products.products : [];
    },
    filter() {
      const facets = this.$store.state.favorites.map(i => {
        return 'a_' + i;
      });
      const sort = 'FACET_ORDER';
      return { facets, sort };
    }
  },
  methods: {},
  meta: {
    pageType: 'Favorite Page'
  }
};
</script>

<style lang="scss">
.ca-favorites-page {
  &__title {
    font-size: $font-size-l;
    font-weight: $font-weight-bold;
    margin: rem-calc(10) 0 rem-calc(24);
    @include bp(tablet) {
      font-size: $font-size-xxl;
      margin: rem-calc(20) 0 rem-calc(36);
    }
  }
  &__list {
    margin: 0 0 rem-calc(30);
    @include bp(tablet) {
      margin: 0 0 rem-calc(60);
    }
  }
  &__empty {
    min-height: rem-calc(200);
    @include flex-calign;
    font-size: $font-size-xl;
    color: $c-text-secondary;
    @include bp(tablet) {
      min-height: rem-calc(300);
      margin: 0 0 rem-calc(80);
    }
  }
}
</style>
