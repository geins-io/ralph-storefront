<template>
  <div class="ca-price" :class="modifiers">
    <span class="ca-price__selling">{{ formatCurrency(sellingPrice) }}</span>
    <span v-if="isSale" class="ca-price__regular">{{
      formatCurrency(regularPrice)
    }}</span>
    <span v-if="!this.$store.state.VATincluded" class="ca-price__ex-vat">
      {{ $t('EX_VAT') }}
    </span>
  </div>
</template>
<script>
import { MixNumberFormat } from '@ralph/ralph-ui';
// @group Atoms
// @vuese
export default {
  name: 'CaPrice',
  components: {},
  mixins: [MixNumberFormat],
  props: {
    sellingPrice: {
      type: Number,
      required: true
    },
    isSale: {
      type: Boolean,
      default: false
    },
    regularPrice: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    minDecimals: 2,
    maxDecimals: 2
  }),
  computed: {
    modifiers() {
      return {
        'ca-price--sale': this.isSale
      };
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-price {
  &__selling {
    font-size: 1.2em;
    font-weight: $font-weight-bold;
  }
  &__regular {
    text-decoration: line-through;
    color: $c-text-secondary;
    margin-left: $px4;
  }
  &__ex-vat {
    margin-left: $px4;
    color: $c-text-secondary;
  }
  &--sale & {
    &__selling {
      color: $c-sale;
    }
  }
}
</style>
