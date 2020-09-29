<template>
  <div class="ca-checkout-confirm-page">
    <CaContainer>
      <!-- eslint-disable vue/no-v-html -->
      <!-- <div v-html="klarnaResponse.html_snippet" /> -->
      <CaCheckoutHeader :title="$t('ORDER_CONFIRM_TITLE')" />
      <CaCheckoutSection :bottom-arrow="false">
        <CaCheckoutKlarna :confirm="true" />
      </CaCheckoutSection>
      <CaCheckoutSection :bottom-arrow="false">
        <template v-slot:title>
          {{ $t('ORDER_SUMMARY_TITLE') }}
        </template>
        <CaCart v-if="orderCart" :cart="orderCart" mode="display" />
      </CaCheckoutSection>
    </CaContainer>
  </div>
</template>

<script>
import CaCheckoutHeader from 'CaCheckoutHeader';
import CaContainer from 'CaContainer';
import CaCart from 'CaCart';
import CaCheckoutSection from 'CaCheckoutSection';
import CaCheckoutKlarna from 'CaCheckoutKlarna';

export default {
  name: 'CheckoutConfirmPage',
  layout: 'undistracted',
  components: {
    CaContainer,
    CaCart,
    CaCheckoutSection,
    CaCheckoutHeader,
    CaCheckoutKlarna
  },
  data: () => ({
    orderCart: null
  }),
  computed: {},
  mounted() {
    document.addEventListener(
      'stateRehydrated',
      e => {
        this.resetCart();
      },
      false
    );
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
