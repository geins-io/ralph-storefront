<template>
  <CaListPageVoyado
    :type="listType"
    :list-info="listInfo"
    :page-reference="decodeURI(this.$route.path)"
  />
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
    pageType: 'Product list'
  }
};
</script>
