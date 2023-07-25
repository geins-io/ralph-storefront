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
  middleware: list-page-routing - handles the routing for the list pages
  
  computed:
    currentAlias: The current alias of the category.
*/
import MixListInfo from 'MixListInfo';
export default {
  middleware: 'list-page-routing',
  name: 'CategoryListView',
  mixins: [MixListInfo],
  data: () => ({
    listType: 'category'
  }),
  computed: {
    currentAlias() {
      return this.$route.params.category.split('/').pop();
    }
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Category Page'
  }
};
</script>
