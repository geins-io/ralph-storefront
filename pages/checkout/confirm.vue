<template>
  <div class="ca-checkout-confirm-page">
    <CaContainer>
      <CaCheckoutHeader :title="$t('ORDER_CONFIRM_TITLE')" />
      <CaCheckoutSection :bottom-arrow="false">
        <CaCheckoutKlarna :confirm="true" />
      </CaCheckoutSection>
      <CaCheckoutSection :bottom-arrow="false">
        <template #title>
          {{ $t('ORDER_SUMMARY_TITLE') }}
        </template>
        <CaCart v-if="orderCart" :cart="orderCart" mode="display" />
      </CaCheckoutSection>
    </CaContainer>
  </div>
</template>

<script>
export default {
  name: 'CheckoutConfirmPage',
  layout: 'undistracted',
  data: () => ({
    orderCart: null
  }),
  computed: {},
  mounted() {
    this.resetCart();
  },
  methods: {
    resetCart() {
      if (this.orderCart === null) {
        this.orderCart = this.$store.state.cart.data;
        this.$cookies.remove('ralph-cart-id');
        this.$store.dispatch('cart/reset');
      }
    }
  }
};
</script>

<style lang="scss">
.ca-checkout-confirm-page {
  max-width: $checkout-width;
  margin: 0 auto;
  padding-bottom: $px32;
  &__title {
    font-size: $font-size-xl;
    text-align: center;
  }
}
</style>
