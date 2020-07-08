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
import categoryInfoQuery from '@/graphql/page-info-category.graphql';
import categoryProductsQuery from '@/graphql/products-category.graphql';

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
