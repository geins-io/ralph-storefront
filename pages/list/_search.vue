<template>
  <CaListPage
    type="search"
    :info-query="infoQuery"
    :current-alias="currentAlias"
    :filters-vars="filtersVars"
  />
</template>

<script>
import categoryInfoQuery from 'productlist/category-page.graphql';

export default {
  middleware: 'list-page-routing',
  name: 'SearchListView',
  mixins: [],
  data: () => ({
    infoQuery: categoryInfoQuery,
  }),
  computed: {
    currentAlias() {
      return this.$route.params.search;
    },
    filtersVars() {
      return {
        categoryAlias: null,
        brandAlias: null,
        filter: {
          searchText: this.currentAlias
        }
      }
    },
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Search Page'
  },
};
</script>
