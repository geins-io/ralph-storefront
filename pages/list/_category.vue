<template>
  <CaListPage
    :type="listType"
    :list-info="listInfo"
    :current-alias="currentAlias"
  />
</template>

<script>
/*
  Renders the category page.
  
  middleware: ralph-list-page-routing - handles the routing for the list pages
  
  computed:
    currentAlias: The current alias of the category.
*/
import MixListInfo from 'MixListInfo';
export default {
  name: 'CategoryListView',
  mixins: [MixListInfo],
  middleware: 'ralph-list-page-routing',
  data: () => ({
    listType: 'category',
  }),
  computed: {
    currentAlias() {
      return this.$route.params.category.split('/').pop();
    },
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Category Page',
  },
};
</script>
