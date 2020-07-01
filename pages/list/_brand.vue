<template>
  <CaListPage
    type="brand"
    :info-query="infoQuery"
    :products-query="productsQuery"
    :current-alias="currentAlias"
  />
</template>

<script>
import CaListPage from '@/components/organisms/CaListPage/CaListPage';
import brandInfoQuery from '@/graphql/page-info-brand.graphql';
import brandProductsQuery from '@/graphql/products-brand.graphql';

export default {
  name: 'BrandListView',
  components: { CaListPage },
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
