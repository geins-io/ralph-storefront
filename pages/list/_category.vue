<template>
  <CaListPage
    type="category"
    :info-query="infoQuery"
    :current-alias="currentAlias"
    :filters-vars="filtersVars"
  />
</template>

<script>
/*
  Renders the category page.
  middleware: list-page-routing - handles the routing for the list pages
  
  computed:
    currentAlias: The current alias of the category.
    filtersVars: The variables for the filters query.
*/
import categoryInfoQuery from 'productlist/category-page.graphql';

export default {
  middleware: 'list-page-routing',
  name: 'CategoryListView',
  mixins: [],
  data() {
    return {
      infoQuery: categoryInfoQuery
    };
  },
  computed: {
    currentAlias() {
      return this.$route.params.category.split('/').pop();
    },

    filtersVars() {
      return {
        categoryAlias: this.currentAlias,
        brandAlias: null,
        filter: null
      };
    }
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Category Page'
  }
};
</script>
