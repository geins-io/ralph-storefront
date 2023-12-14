<template>
  <CaListPage
    :type="listType"
    :list-info="staticListInfo"
    :current-alias="currentAlias"
  />
</template>

<script>
/*
  Renders the search page.

  middleware: ralph-list-page-routing - handles the routing for the list pages

  computed:
    currentAlias: The current alias of the search.
    staticListInfo: The listPageInfo for the search page.

*/

export default {
  name: 'SearchListView',
  mixins: [],
  middleware: 'ralph-list-page-routing',
  data: () => ({ listType: 'search' }),
  computed: {
    currentAlias() {
      return this.$route.params.search;
    },
    staticListInfo() {
      const title = this.$t('SEARCH_RESULTS_PAGE_TITLE', {
        search: this.$route.params.search,
      });
      return {
        name: title,
        meta: {
          title,
          description: title,
        },
      };
    },
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Search Page',
  },
};
</script>
