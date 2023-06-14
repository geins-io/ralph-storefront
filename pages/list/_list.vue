<template>
  <VoyadoListPage :type="listType" :list-info="listInfo" />
</template>

<script>
/*
  Renders the list page.

  middleware: list-page-routing - handles the routing for the list pages

*/
import MixSaleUtils from 'MixSaleUtils';
import MixListInfo from 'MixListInfo';

export default {
  middleware: 'list-page-routing',
  name: 'ListView',
  mixins: [MixListInfo, MixSaleUtils],
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
