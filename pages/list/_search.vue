<template>
  <CaListPage
    type="search"
    :info-query="infoQuery"
    :current-alias="currentAlias"
    :base-filters="baseFilters"
  />
</template>

<script>
import categoryInfoQuery from 'productlist/category-page.graphql';
import filtersQuery from 'productlist/products-filter.graphql';

export default {
  middleware: 'list-page-routing',
  name: 'SearchListView',
  mixins: [],
  apollo: {
    products: {
      query() {
        return filtersQuery;
      },
      variables() {
        return {
          categoryAlias: null,
          brandAlias: null,
          filter: {
            searchText: this.currentAlias
          }
        };
      },
      result(result) {
        if (result?.data?.products?.filters.facets.length > 0) {
          this.baseFilters = result.data.products.filters;
        }
        this.$store.dispatch('loading/end');
      },
      skip() {
        return this.filtersLoaded;
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  data: () => ({
    infoQuery: categoryInfoQuery,
    baseFilters: {}
  }),
  computed: {
    currentAlias() {
      return this.$route.params.search;
    },
    filtersLoaded() {
      return Object.keys(this.baseFilters).length > 0;
    }
  },
  mounted() {},
  methods: {}
};
</script>
