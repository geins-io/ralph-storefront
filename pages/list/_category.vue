<template>
  <CaListPage
    type="category"
    :info-query="infoQuery"
    :current-alias="currentAlias"
    :base-filters="baseFilters"
  />
</template>

<script>
import categoryInfoQuery from 'productlist/category-page.graphql';
import filtersQuery from 'productlist/products-filter.graphql';

export default {
  name: 'CategoryListView',
  mixins: [],
  apollo: {
    products: {
      query() {
        return filtersQuery;
      },
      variables() {
        return {
          categoryAlias: this.currentAlias,
          brandAlias: null,
          filter: null
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
      return this.$route.params.category.split('/').pop();
    },
    filtersLoaded() {
      return Object.keys(this.baseFilters).length > 0;
    }
  },
  mounted() {},
  methods: {}
};
</script>
