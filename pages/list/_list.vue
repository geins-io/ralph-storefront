<template>
  <CaListPage
    type="list"
    :info-query="infoQuery"
    :current-path="currentPath"
    :filters-vars="filtersVars"
  />
</template>

<script>
import listInfoQuery from 'productlist/list-page.graphql';

export default {
  middleware: 'list-page-routing',
  name: 'ListView',
  mixins: [],
  data() {
    return {
      infoQuery: listInfoQuery
    };
  },
  computed: {
    currentPath() {
      return this.$route.path;
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
    pageType: 'List Page'
  }
};
</script>
