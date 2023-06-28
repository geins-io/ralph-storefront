<template>
  <CaListPageVoyado :type="listType" :list-info="staticListInfo" />
</template>

<script>
/*
  Renders the search page.
*/
export default {
  name: 'SearchListView',
  mixins: [],
  data: () => ({
    listType: 'search'
  }),
  computed: {
    staticListInfo() {
      const title = this.$t('SEARCH_RESULTS_PAGE_TITLE', {
        search: this.$route.params.search
      });
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
    pageType: 'Search'
  }
};
</script>
