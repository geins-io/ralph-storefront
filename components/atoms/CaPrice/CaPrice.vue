<template>
  <div class="ca-price" :class="priceModifiers">
    <span v-if="price.isDiscounted" class="ca-price__regular">
      {{ regularPrice }}
    </span>
    <span class="ca-price__selling">{{ sellingPrice }}</span>
    <span v-if="!vatIncluded" class="ca-price__ex-vat">
      {{ $t('EX_VAT') }}
    </span>
  </div>
</template>
<script>
/*
  CaPrice is a reusable component that displays the price of the product.
*/
import MixPrice from 'MixPrice';
export default {
  name: 'CaPrice',
  mixins: [MixPrice],
  props: {
    type: {
      type: String,
      default: 'NONE',
      validator(value) {
        return ['NONE', 'SALE_PRICE', 'PRICE_CAMPAIGN'].includes(value);
      }
    },
    price: {
      type: Object,
      required: true
    }
  },
  computed: {
    priceModifiers() {
      if (this.type === 'PRICE_CAMPAIGN') {
        return 'ca-price--campaign';
      }

      if (this.type === 'SALE_PRICE') {
        return 'ca-price--product-sale';
      }

      return '';
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-price';
</style>
