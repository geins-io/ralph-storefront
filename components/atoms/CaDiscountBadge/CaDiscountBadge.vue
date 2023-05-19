<template>
  <div
    v-if="price.discountPercentage"
    class="ca-discount-badge"
    :class="badgeModifiers"
  >
    {{ price.discountPercentage }} %
  </div>
</template>
<script>
/* 
  CaDiscountBadge is a reusable component that displays different 
  discount type (sale or campaign) of the product as a badge.
*/
export default {
  name: 'CaDiscountBadge',
  mixins: [],
  props: {
    priceType: {
      type: String,
      required: true
    },
    price: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    isSalePrice() {
      return this.priceType === 'SALE_PRICE';
    },
    isCampaignPrice() {
      return this.priceType === 'PRICE_CAMPAIGN';
    },
    badgeModifiers() {
      if (this.isSalePrice) {
        return 'ca-discount-badge--sale';
      }
      
      if (this.isCampaignPrice) {
        return 'ca-discount-badge--campaign';
      }

      return '';
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-discount-badge';
</style>
