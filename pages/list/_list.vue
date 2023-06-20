<template>
  <CaListPageVoyado
    :type="listType"
    :list-info="listInfo"
    :page-reference="pageReference"
    :product-rules="productRules"
  />
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
  computed: {
    productRules() {
      return this.isSale
        ? 'rule excl custom.price_type { "CAMPAIGN_PRICE" "NONE" }'
        : 'rule excl custom.price_type { "SALE_PRICE" }';
    },
    pageReference() {
      const pageRef = decodeURI(this.$route.path);
      return this.isSale ? pageRef.replace(this.salePath, '') : pageRef;
    }
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Product list'
  }
};
</script>
