<template>
  <CaListPage
    type="brand"
    :info-query="infoQuery"
    :current-alias="currentAlias"
    :filters-vars="filtersVars"
  />
</template>

<script>
/*
  Renders the brand page.

  middleware: list-page-routing - handles the routing for the list pages
  
  computed:
    currentAlias: The current alias of the brand.
    filtersVars: The variables for the filters query.

*/
import brandInfoQuery from 'productlist/brand-page.graphql';

export default {
  middleware: 'list-page-routing',
  name: 'BrandListView',
  mixins: [],
  data: () => ({
    infoQuery: brandInfoQuery
  }),
  computed: {
    currentAlias() {
      return this.$route.params.brand.split('/').pop();
    },
    filtersVars() {
      return {
        categoryAlias: null,
        brandAlias: this.currentAlias,
        filter: null
      };
    }
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Brand Page'
  }
};
</script>
