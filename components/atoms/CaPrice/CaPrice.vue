<template>
  <div class="ca-price" :class="modifiers">
    <span class="ca-price__selling">{{ sellingPrice }}</span>
    <span v-if="price.isDiscounted" class="ca-price__regular">
      {{ regularPrice }}
    </span>
    <span v-if="!this.$store.state.VATincluded" class="ca-price__ex-vat">
      {{ $t('EX_VAT') }}
    </span>
  </div>
</template>
<script>
// @group Atoms
// @vuese
export default {
  name: 'CaPrice',
  components: {},
  props: {
    price: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-price--sale': this.price.isDiscounted
      };
    },
    sellingPrice() {
      return this.$store.state.VATincluded
        ? this.price.sellingPriceIncVat
        : this.price.sellingPriceExVat;
    },
    regularPrice() {
      return this.$store.state.VATincluded
        ? this.price.regularPriceIncVat
        : this.price.regularPriceExVat;
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
