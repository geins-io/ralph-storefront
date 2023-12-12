<template>
  <CaListPage
    :type="listType"
    :list-info="listInfo"
    :current-alias="currentAlias"
  />
</template>

<script>
/*
  Renders the brand page.

  middleware: ralph-list-page-routing - handles the routing for the list pages
  
  computed:
    currentAlias: The current alias of the brand.

*/
import MixListInfo from 'MixListInfo';

export default {
  name: 'BrandListView',
  mixins: [MixListInfo],
  middleware: 'ralph-list-page-routing',
  data: () => ({
    listType: 'brand',
  }),
  computed: {
    currentAlias() {
      return this.$route.params.brand.split('/').pop();
    },
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Brand Page',
  },
};
</script>
