<template>
  <CaListPage
    type="brand"
    :info-query="infoQuery"
    :current-alias="currentAlias"
    :base-filters="baseFilters"
  />
</template>

<script>
import brandInfoQuery from 'productlist/brand-page.graphql';
import filtersQuery from 'productlist/products-filter.graphql';

export default {
  middleware: 'list-page-routing',
  name: 'BrandListView',
  mixins: [],
  apollo: {
    products: {
      query() {
        return filtersQuery;
      },
      variables() {
        return {
          categoryAlias: null,
          brandAlias: this.currentAlias,
          filter: null
        };
      },
      result(result) {
        if (result?.data?.products?.filters.facets.length > 0) {
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
    infoQuery: brandInfoQuery,
    baseFilters: {}
  }),
  computed: {
    currentAlias() {
      return this.$route.params.brand.split('/').pop();
    },
    filtersLoaded() {
      return Object.keys(this.baseFilters).length > 0;
    }
  },
  mounted() {},
  methods: {}
};
</script>
