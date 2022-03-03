<template>
  <CaListPage
    type="brand"
    :info-query="infoQuery"
    :current-alias="currentAlias"
    :filters-vars="filtersVars"
  />
</template>

<script>
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
  methods: {}
};
</script>
