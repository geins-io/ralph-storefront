<template>
  <div class="ca-checkout">
    <CaCheckoutHeader :title="$t('CHECKOUT')" />
    <button
      v-if="!$store.getters['auth/authenticated']"
      type="button"
      class="ca-checkout__login"
      @click="
        $store.commit('contentpanel/open', {
          name: 'account',
          frame: 'login',
        })
      "
    >
      {{ $t('LOG_IN') }}/{{ $t('CREATE_ACCOUNT') }}
    </button>
    <div v-else-if="$config.customerTypesToggle" class="ca-checkout__logout">
      <CaCustomerTypeToggle />
      <CaClickable class="ca-checkout__logout-button" @clicked="logout">
        {{ $t('LOG_OUT') }}
      </CaClickable>
    </div>
    <CaCheckoutSection
      v-if="
        !$store.getters['auth/authenticated'] && $config.customerTypesToggle
      "
    >
      <template #title>
        {{ $t('SHOP_AS') }}
      </template>
      <CaCustomerTypeToggle class="ca-checkout__vat-toggle" />
    </CaCheckoutSection>
    <CaCheckoutSection
      :bottom-arrow="$store.getters['cart/totalQuantity'] > 0"
      :loading="cartLoading"
    >
      <template #title>
        {{ $t('CART') }}
        <span v-if="cart.data && cart.data.items">
          ({{ $store.getters['cart/totalQuantity'] }})
        </span>
      </template>
      <CaCart
        v-if="cart.data"
        :cart="cart.data"
        @loading="cartLoading = $event"
      />
    </CaCheckoutSection>

    <CaCheckoutSection
      v-if="
        $store.getters['cart/totalQuantity'] &&
        $config.checkout.showMultipleMarkets &&
        selectableMarkets &&
        selectableMarkets.length > 1
      "
      :loading="cartLoading"
    >
      <template #title>{{ $t('CHECKOUT_CHOOSE_COUNTRY') }}</template>
      <CaCountrySelector
        :data="selectableMarkets"
        @input="setCheckoutMarket($event)"
      />
    </CaCheckoutSection>

    <CaCheckoutSection
      v-if="$store.getters['cart/totalQuantity'] > 0"
      :loading="shippingLoading"
      :blocked="$config.checkout.showMultipleMarkets && !currentMarket"
    >
      <template #title>
        {{ $t('CHECKOUT_CHOOSE_SHIPPING') }}
      </template>
      <CaShippingOptions
        v-if="$config.checkout.useInternalShipping && checkout.shippingOptions"
        class="ca-checkout__shipping-options"
        :options="checkout.shippingOptions"
        @selection="shippingSelectionHandler"
      />
      <CaNshift
        v-else-if="!$config.checkout.useInternalShipping"
        ref="nshift"
        :shipping-data="checkout.shippingData"
        :zip="currentZip"
        :parent-loading="shippingLoading"
        :data-is-set="nshiftDataSet"
        @init="initNshift"
        @changed="setNshiftData"
        @validation="nshiftValid = $event"
      />
      <template #guard>
        {{ $t('CHECKOUT_LOCATION_GUARD') }}
      </template>
    </CaCheckoutSection>
    <CaCheckoutSection
      v-if="$store.getters['cart/totalQuantity'] > 0"
      :bottom-arrow="false"
      :loading="
        !checkout ||
        (checkoutLoading && paymentType === 'STANDARD') ||
        frameLoading
      "
      :blocked="$refs.nshift && !nshiftValid"
    >
      <template #title>
        {{ hasPaymentOptions ? $t('CHECKOUT_PAY') : $t('COMPLETE_ORDER') }}
      </template>
      <h3 v-if="hasPaymentOptions" class="ca-checkout__sub-heading">
        <span class="ca-checkout__sub-heading--inner">
          {{ $t('CHECKOUT_CHOOSE_PAYMENT') }}
        </span>
      </h3>
      <CaPaymentOptions
        v-if="hasPaymentOptions"
        class="ca-checkout__payment-options"
        :options="checkout.paymentOptions"
        @selection="paymentSelectionHandler"
      />
      <h3 v-if="hasPaymentOptions" class="ca-checkout__sub-heading">
        <span class="ca-checkout__sub-heading--inner">
          {{ $t('COMPLETE_ORDER') }}
        </span>
      </h3>
      <CaCheckoutExternal
        v-if="
          paymentType === 'KLARNA' ||
          paymentType === 'SVEA' ||
          paymentType === 'WALLEY'
        "
        ref="externalcheckout"
        :data="selectedPaymentOption.paymentData"
        :new-checkout-session="selectedPaymentOption.newCheckoutSession"
        :type="paymentType"
      />
      <CaCheckoutInvoice
        v-else
        ref="checkoutInvoice"
        :checkout="checkout"
        @update="updateCheckoutData"
        @place-order="placeOrder"
      />
      <template #guard>
        {{ $t('CHECKOUT_PAYMENT_GUARD') }}
      </template>
    </CaCheckoutSection>
  </div>
</template>
<script>
/* 
  This component is the main checkout component. It holds the different sections of the checkout.
  It also handles the different checkout steps and the different payment options.

  The checkout is divided into 3 or 4 steps:
  1. Cart
  (2. Market/Country)
  3. Shipping
  4. Payment

  The checkout has 4 different standard payment options:
  1. Invoice
  2. Klarna
  3. Svea
  4. Walley

*/

import MixCheckout from 'MixCheckout';
export default {
  name: 'CaCheckout',
  mixins: [MixCheckout],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
    },
  },
};
</script>
<style lang="scss">
@import 'organisms/ca-checkout';
</style>
