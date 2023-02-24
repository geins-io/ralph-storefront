<template>
  <CaListPage
    type="all"
    :info-query="infoQuery"
    :current-alias="currentAlias"
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
    }
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Products Page'
  }
};
</script>
