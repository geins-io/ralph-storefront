<template>
  <CaListPage
    type="all"
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
  name: 'AllListView',
  mixins: [],
  apollo: {
    products: {
      query() {
        return filtersQuery;
      },
      result(result) {
        if (result.data.products.filters.facets.length > 0) {
          this.baseFilters = result.data.products.filters;
        }
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
      return 'all';
    },
    filtersLoaded() {
      return Object.keys(this.baseFilters).length > 0;
    }
  },
  mounted() {},
  methods: {}
};
</script>
