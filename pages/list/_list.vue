<template>
  <CaListPage :type="listType" :list-info="listInfo" />
</template>

<script>
/*
  Renders the list page.
  
  middleware: ralph-list-page-routing - handles the routing for the list pages

*/
import MixListInfo from 'MixListInfo';

export default {
  name: 'ListView',
  mixins: [MixListInfo],
  middleware: 'ralph-list-page-routing',
  data: () => ({
    listType: 'list',
  }),
  computed: {},
  mounted() {},
  methods: {},
  meta: {
    pageType: 'List Page',
  },
};
</script>
