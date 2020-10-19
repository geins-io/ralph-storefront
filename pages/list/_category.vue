<template>
  <CaListPage
    type="category"
    :info-query="infoQuery"
    :products-query="productsQuery"
    :current-alias="currentAlias"
  />
</template>

<script>
import CaListPage from 'CaListPage';
import categoryInfoQuery from 'productlist/category-page.graphql';
import categoryProductsQuery from 'productlist/category-products.graphql';

export default {
  name: 'CategoryListView',
  components: { CaListPage },
  mixins: [],
  data: () => ({
    infoQuery: categoryInfoQuery,
    productsQuery: categoryProductsQuery
  }),
  computed: {
    currentAlias() {
      return this.$route.params.category;
    }
  },
  mounted() {},
  methods: {}
};
</script>
