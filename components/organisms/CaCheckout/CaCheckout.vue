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
          frame: 'login'
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
      v-if="$store.getters['cart/totalQuantity'] > 0"
      :loading="shippingLoading"
    >
      <template #title>
        {{ $t('CHECKOUT_CHOOSE_SHIPPING') }}
      </template>
      <CaUdc
        ref="udc"
        :shipping-data="checkout.shippingData"
        :zip="currentZip"
        :parent-loading="shippingLoading"
        @init="initUDC"
        @changed="setUDCdata"
        @validation="udcValid = $event"
      />
    </CaCheckoutSection>
    <CaCheckoutSection
      v-if="$store.getters['cart/totalQuantity'] > 0"
      :bottom-arrow="false"
      :loading="
        !checkout ||
          (checkoutLoading && paymentType === 'STANDARD') ||
          frameLoading
      "
      :blocked="!udcValid"
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
        v-if="paymentType === 'KLARNA' || paymentType === 'SVEA'"
        ref="externalcheckout"
        :data="selectedPaymentOption.paymentData"
        :new-checkout-session="selectedPaymentOption.newCheckoutSession"
        :type="paymentType"
      />
      <CaCheckoutCarismar
        v-else
        ref="checkoutCarismar"
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
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      if (this.$config.user.priceLists) {
        this.checkoutLoading = true;
        location.reload();
      }
    }
  }
};
</script>
<style lang="scss">
.ca-checkout {
  max-width: $checkout-width;
  margin: 0 auto;
  padding-bottom: $px32;
  &__login {
    margin: 0 auto rem-calc(-14);
    text-decoration: underline;
    display: table;
  }
  &__logout {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__logout-button {
    text-decoration: underline;
  }
  &__sub-heading {
    font-size: $font-size-m;
    font-weight: $font-weight-bold;
    margin: 0 0 rem-calc(20);
    position: relative;
    z-index: 1;
    text-align: center;
    &::before {
      content: '';
      display: block;
      height: 1px;
      width: 100%;
      @include valign;
      background: $c-border-dark;
      z-index: -2;
    }
    &--inner {
      display: inline-block;
      background: $c-white;
      padding: $px4 rem-calc(26);
    }
    @include bp(laptop) {
      font-size: $font-size-l;
    }
  }
  &__payment-options {
    margin: 0 0 rem-calc(20);
  }
  &__vat-toggle {
    .ca-customer-type-toggle__toggles {
      justify-content: center;
      align-items: center;
      height: 4rem;
    }

    .ca-customer-type-toggle__link {
      display: flex;
      align-items: center;
      font-size: $font-size-xs;
      @include bp(tablet) {
        font-size: $font-size-s;
      }
      &:first-child {
        margin-right: $px16;
        @include bp(tablet) {
          margin-right: $px32;
        }
      }
      &::before {
        content: '';
        width: 20px;
        height: 20px;
        box-shadow: 0 0 0 1px $c-medium-gray;
        border: 4px solid $c-white;
        background: $c-white;
        border-radius: 50%;
        margin-right: $px10;
      }
      &--active {
        &::before {
          background: $c-accent-color;
        }
      }
    }
  }
}
</style>
