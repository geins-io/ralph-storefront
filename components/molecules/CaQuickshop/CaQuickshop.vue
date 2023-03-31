<template>
  <ul class="ca-quickshop">
    <li
      v-for="(sku, index) in product.skus"
      :key="index"
      class="ca-quickshop__item"
      :class="getModifiers(sku)"
    >
      <button class="ca-quickshop__button" @click="handleClick(sku)">
        <span class="ca-quickshop__name">{{ sku.name }}</span>
        <span
          v-if="getStockStatus(sku.stock) === 'FEW_LEFT'"
          class="ca-quickshop__status"
        >
          {{ $t('STOCK_STATUS_FEW_LEFT') }}
        </span>
        <CaIcon
          v-if="getStockStatus(sku.stock) !== 'OUT_OF_STOCK'"
          name="shopping-bag"
          class="ca-quickshop__icon"
        />
        <span v-else class="ca-quickshop__remind">{{ $t('REMIND_ME') }}</span>
      </button>
    </li>
  </ul>
</template>
<script>
/*
  This component handles the list of sku Items to quickshop
*/
import { mapState } from 'vuex';
import MixStockHandler from 'MixStockHandler';
import MixAddToCart from 'MixAddToCart';
export default {
  name: 'CaQuickshop',
  mixins: [MixStockHandler, MixAddToCart],
  props: {},
  data: () => ({}),
  computed: {
    ...mapState({
      product: state => state.quickshop.product
    })
  },
  watch: {},
  mounted() {},
  methods: {
    handleClick(sku) {
      if (this.getStockStatus(sku.stock) === 'OUT_OF_STOCK') {
        const notifyVariant = {
          label: sku.name
        };
        this.$store.commit('quickshop/setNotifyVariant', notifyVariant);
        this.$nextTick(() => {
          this.$store.commit('contentpanel/open', {
            name: 'notify'
          });
        });
      } else {
        this.$store.commit('contentpanel/close');
        this.addToCart(sku.skuId, 1, this.product);
      }
    },
    getModifiers(sku) {
      const modifiers = [];
      if (this.getStockStatus(sku.stock) === 'OUT_OF_STOCK') {
        modifiers.push('ca-quickshop__item--out-of-stock');
      }
      return modifiers;
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-quickshop';
</style>
