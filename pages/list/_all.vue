<template>
  <CaListPage
    type="all"
    :info-query="infoQuery"
    :current-alias="currentAlias"
  />
</template>

<script>
import categoryInfoQuery from 'productlist/category-page.graphql';

export default {
  middleware: 'list-page-routing',
  name: 'AllListView',
  mixins: [],
  data: () => ({
    infoQuery: categoryInfoQuery,
  }),
  computed: {
    currentAlias() {
      return 'all';
    },
  },
  mounted() {},
  methods: {}
};
</script>
