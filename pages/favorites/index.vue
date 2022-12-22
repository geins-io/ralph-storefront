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
          take: this.$store.state.favorites.length,
          marketId: this.$store.state.marketId
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
@import 'organisms/ca-favorites-page';
</style>
