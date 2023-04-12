<template>
  <div ref="orderSuccess" class="ca-checkout-confirm-page">
    <CaContainer>
      <CaCheckoutHeader :title="$t('ORDER_CONFIRM_TITLE')" />
      <CaCheckoutSection :bottom-arrow="false" class="ca-checkout-confirm-page__order-confirm">
        <div class="ca-checkout-confirm">
          <CaIcon class="ca-checkout-confirm__icon" name="checkmark-confirm-animated" />
          <h2 class="ca-checkout-confirm__title">
            {{ $t('CHECKOUT_CONFIRM_TITLE') }}
          </h2>
          <i18n
            path="CHECKOUT_CONFIRM_TEXT"
            class="ca-checkout-confirm__text"
            tag="p"
          >
            <template #email>
              <strong>{{ $route.query.email }}</strong>
            </template>
          </i18n>
          <p v-if="$route.query.oid" class="ca-checkout-confirm__id">
            {{ $t('ORDER_NUMBER') }}: #{{ $route.query.oid }}
          </p>
          <p class="ca-checkout-confirm__regards">{{ $t('CHECKOUT_REGARDS') }}</p>
        </div>
      </CaCheckoutSection>
      <CaCheckoutSection :bottom-arrow="false" class="ca-checkout-confirm-page__cart">
        <template #title>
          {{ $t('ORDER_SUMMARY_TITLE') }}
        </template>
        <client-only>
          <CaCart v-if="orderCart" :cart="orderCart" mode="display" />
          <div v-if="noCart" class="ca-checkout-confirm-page__no-cart">
            {{ $t('ORDER_SUMMARY_NO_CART') }}
          </div>
        </client-only>
      </CaCheckoutSection>
    </CaContainer>
  </div>
</template>

<script>
/*
  Renders the checkout confirm page.

  layout: undistracted - removes the header and footer

*/
import MixConfirmPage from 'MixConfirmPage';
import MixCheckoutPage from 'MixCheckoutPage';
import party from 'party-js';
export default {
  name: 'CheckoutConfirmPage',
  layout: 'undistracted-special',
  mixins: [MixConfirmPage, MixCheckoutPage],
  data: () => ({}),
  computed: {},
  mounted() {
    this.$nextTick(() => {
      party.confetti(this.$refs.orderSuccess, {
        count: party.variation.range(70, 100),
        size: party.variation.range(0.8, 1.2),
      });
    });
  },
  methods: {},
  meta: {
    pageType: 'Confirm Page'
  }
};
</script>

<style lang="scss">
@import './styles/pages/checkout-confirm-page';
</style>
