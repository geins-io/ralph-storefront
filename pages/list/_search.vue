<template>
  <VoyadoSearchPage :query="query" />
</template>

<script>
/*
  Renders the search page.

*/
export default {
  name: 'SearchListView',
  mixins: [],
  data: () => ({}),
  computed: {
    query() {
      return this.$route.params.search;
    }
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Search'
  }
};
</script>
