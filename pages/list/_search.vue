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

  middleware: list-page-routing - handles the routing for the list pages

  computed:
    currentAlias: The current alias of the search.
    filtersVars: The variables for the filters query.

*/

export default {
  middleware: 'list-page-routing',
  name: 'SearchListView',
  mixins: [],
  data: () => ({ listType: 'search' }),
  computed: {
    currentAlias() {
      return this.$route.params.search;
    },
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
    pageType: 'Search Page'
  }
};
</script>
