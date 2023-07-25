<template>
  <CaListPage :type="listType" :list-info="listInfo" />
</template>

<script>
/*
  Renders the list page.
  
  middleware: list-page-routing - handles the routing for the list pages

*/
import MixListInfo from 'MixListInfo';

export default {
  middleware: 'list-page-routing',
  name: 'ListView',
  mixins: [MixListInfo],
  data: () => ({
    listType: 'list'
  }),
  computed: {},
  mounted() {},
  methods: {},
  meta: {
    pageType: 'List Page'
  }
};
</script>
