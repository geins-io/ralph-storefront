<template>
  <div class="ca-price" :class="modifiers">
    <span class="ca-price__selling">{{ sellingPrice }}</span>
    <span v-if="price.isDiscounted" class="ca-price__regular">
      {{ regularPrice }}
    </span>
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
  mixins: [MixPrice]
};
</script>
<style lang="scss">
@import 'atoms/ca-price';
</style>
