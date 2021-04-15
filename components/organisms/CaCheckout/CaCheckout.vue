<template>
  <div class="ca-checkout">
    <CaCheckoutHeader :title="$t('CHECKOUT')" />
    <!-- <CaCheckoutSection>
      <template #title>
        {{ $t('SHOP_AS') }}
      </template>
      <CaVatToggle class="ca-checkout__vat-toggle" />
    </CaCheckoutSection> -->
    <CaCheckoutSection
      :bottom-arrow="$store.getters['cart/totalQuantity'] > 0"
      :loading="cartLoading"
    >
      <template #title>
        {{ $t('CART') }} ({{ $store.getters['cart/totalQuantity'] }})
      </template>
      <CaCart :cart="cart.data" @loading="cartLoading = $event" />
    </CaCheckoutSection>
    <CaCheckoutSection
      v-if="$store.getters['cart/totalQuantity'] > 0"
      :bottom-arrow="false"
      :loading="!checkout.paymentMode || checkoutLoading"
    >
      <template #title>
        {{ $t('COMPLETE_ORDER') }}
      </template>
      <CaCheckoutKlarna v-if="checkout.paymentMode === 'Klarna'" />
      <CaCheckoutCarismar
        v-else-if="checkout.paymentMode === 'SIMPLE'"
        ref="checkoutCarismar"
        :checkout="checkout"
        @update="updateCheckoutData"
        @place-order="placeOrder"
      />
    </CaCheckoutSection>
  </div>
</template>
<script>
import MixCheckout from 'MixCheckout';
// @group Organisms
// @vuese
// Holds the different sections of the checkout
export default {
  name: 'CaCheckout',
  mixins: [MixCheckout],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-checkout {
  max-width: $checkout-width;
  margin: 0 auto;
  padding-bottom: $px32;
  &__vat-toggle {
    justify-content: center;
    .ca-vat-toggle__link {
      display: flex;
      align-items: center;
      font-size: $font-size-xs;
      @include bp(tablet) {
        font-size: $font-size-s;
      }
      &:first-child {
        margin-right: $px16;
        @include bp(tablet) {
          margin-right: $px24;
        }
      }
      &::before {
        content: '';
        width: 20px;
        height: 20px;
        box-shadow: 0 0 0 1px $c-medium-gray;
        border: 5px solid $c-white;
        background: $c-white;
        border-radius: 50%;
        margin-right: $px8;
      }
      &--active {
        &::before {
          background: $c-darkest-gray;
        }
      }
    }
  }
}
</style>
