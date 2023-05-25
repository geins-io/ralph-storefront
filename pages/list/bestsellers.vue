<template>
  <CaListPage
    type="all"
    :info-query="infoQuery"
    :custom-list-info="customListInfo"
    :current-alias="currentAlias"
    :exclude-facets="isSale ? [] : [`${saleFacet}`]"
    :implicit-facets="['p_1_40_BESTSELLER']"
  />
</template>

<script>
/*
  Renders the list page for bestsellers.
  
  middleware: list-page-routing - handles the routing for the list pages
  
  computed:
    currentPath: The current path of the list page.
    filtersVars: The variables for the filters query.

*/

import categoryInfoQuery from 'productlist/category-page.graphql';
import MixSaleUtils from 'MixSaleUtils';

export default {
  middleware: 'list-page-routing',
  name: 'BestsellerView',
  mixins: [MixSaleUtils],
  data: () => ({
    infoQuery: categoryInfoQuery
  }),
  computed: {
    currentAlias() {
      return 'all';
    },
    customListInfo() {
      const title = this.$t('BESTSELLER_PAGE_TITLE');
      return {
        name: title,
        meta: {
          title,
          description: title
        }
      };
    }
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Bestseller Page'
  }
};
</script>
