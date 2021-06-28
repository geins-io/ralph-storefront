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
        this.baseFilters = result.data.products.filters;
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
