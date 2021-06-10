<template>
  <CaListPage
    type="search"
    :info-query="infoQuery"
    :products-query="productsQuery"
    :current-alias="currentAlias"
  />
</template>

<script>
import categoryInfoQuery from 'productlist/category-page.graphql';
import categoryProductsQuery from 'productlist/category-products.graphql';

export default {
  name: 'SearchListView',
  mixins: [],
  data: () => ({
    infoQuery: categoryInfoQuery,
    productsQuery: categoryProductsQuery
  }),
  computed: {
    currentAlias() {
      return this.$route.params.search;
    }
  },
  mounted() {},
  methods: {}
};
</script>
