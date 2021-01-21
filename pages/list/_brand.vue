<template>
  <CaListPage
    type="brand"
    :info-query="infoQuery"
    :products-query="productsQuery"
    :current-alias="currentAlias"
  />
</template>

<script>
import brandInfoQuery from 'productlist/brand-page.graphql';
import brandProductsQuery from 'productlist/brand-products.graphql';

export default {
  name: 'BrandListView',
  mixins: [],
  data: () => ({
    infoQuery: brandInfoQuery,
    productsQuery: brandProductsQuery
  }),
  computed: {
    currentAlias() {
      return this.$route.params.brand;
    }
  },
  mounted() {},
  methods: {}
};
</script>
