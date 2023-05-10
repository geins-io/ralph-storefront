<template>
  <CaListPage
    type="all"
    :info-query="infoQuery"
    :current-alias="currentAlias"
    :exclude-facets="[`${saleFacet}`]"
  />
</template>

<script>
/*
  Renders the all products page.

  middleware: list-page-routing - handles the routing for the list pages

*/
import categoryInfoQuery from 'productlist/category-page.graphql';

export default {
  middleware: 'list-page-routing',
  name: 'AllListView',
  mixins: [],
  data: () => ({
    infoQuery: categoryInfoQuery
  }),
  computed: {
    currentAlias() {
      return 'all';
    },
    saleFacet() {
      const facet = 'rp_sale_';
      const currency = this.$store.getters['channel/currentCurrency'];

      return `${facet}${currency}`.toLowerCase();
    }
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Products Page'
  }
};
</script>
