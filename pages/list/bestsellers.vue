<template>
  <CaListPage
    :type="listType"
    :list-info="staticListInfo"
    :implicit-facets="['p_1_40_BESTSELLER']"
  />
</template>

<script>
/*
  Renders the list page for bestsellers.
  
  middleware: list-page-routing - handles the routing for the list pages

*/

export default {
  middleware: 'list-page-routing',
  name: 'BestsellerView',
  mixins: [],
  data: () => ({
    listType: 'all'
  }),
  computed: {
    staticListInfo() {
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
