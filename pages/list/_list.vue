<template>
  <CaListPage
    type="list"
    :info-query="infoQuery"
    :current-path="currentPath"
    :filters-vars="filtersVars"
    :exclude-facets="isSale ? [] : [`${saleFacet}`]"
  />
</template>

<script>
/*
  Renders the list page.

  middleware: list-page-routing - handles the routing for the list pages

  computed:
    currentPath: The current path of the list page.
    filtersVars: The variables for the filters query.

*/
import listInfoQuery from 'productlist/list-page.graphql';
import MixSaleUtils from 'MixSaleUtils';

export default {
  middleware: 'list-page-routing',
  name: 'ListView',
  mixins: [MixSaleUtils],
  data() {
    return {
      infoQuery: listInfoQuery
    };
  },
  computed: {
    currentPath() {
      return decodeURI(this.$route.path);
    },
    filtersVars() {
      return {
        listPageUrl: this.currentPath,
        filter: null
      };
    }
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Product list'
  }
};
</script>
