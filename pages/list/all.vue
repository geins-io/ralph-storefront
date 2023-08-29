<template>
  <CaListPage :type="listType" :list-info="staticListInfo" />
</template>

<script>
/*
  Renders the all products page.

  middleware: list-page-routing - handles the routing for the list pages

*/

export default {
  name: 'AllListView',
  mixins: [],
  middleware: 'list-page-routing',
  data: () => ({
    listType: 'all',
  }),
  computed: {
    staticListInfo() {
      const title = this.$t('ALL_PAGE_TITLE');
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
    pageType: 'All Page',
  },
};
</script>
