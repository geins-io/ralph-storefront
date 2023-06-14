<template>
  <CaListPage
    :type="listType"
    :list-info="staticListInfo"
    :exclude-facets="[`${saleFacet}`]"
  />
</template>

<script>
/*
  Renders the all products page.

  middleware: list-page-routing - handles the routing for the list pages

*/
import MixSaleUtils from 'MixSaleUtils';

export default {
  middleware: 'list-page-routing',
  name: 'AllListView',
  mixins: [MixSaleUtils],
  data: () => ({
    listType: 'all'
  }),
  computed: {
    staticListInfo() {
      const title = this.$t('ALL_PAGE_TITLE');
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
    pageType: 'News'
  }
};
</script>
