<template>
  <div class="ca-checkout-confirm-page">
    <CaContainer>
      <CaCheckoutHeader :title="$t('ORDER_CONFIRM_TITLE')" />
      <CaCheckoutSection :bottom-arrow="false">
        <CaCheckoutExternal
          v-if="$route.query.kid || $route.query.sid"
          :type="$route.query.sid ? 'SVEA' : 'KLARNA'"
          :confirm="true"
        />
        <CaCheckoutExternal
          v-if="$route.query.wid"
          :type="'WALLEY'"
          :confirm="true"
        />
        <div v-else class="ca-checkout-confirm">
          <CaIcon class="ca-checkout-confirm__icon" name="check-circle" />
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
        </div>
      </CaCheckoutSection>
      <CaCheckoutSection :bottom-arrow="false">
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
export default {
  name: 'CheckoutConfirmPage',
  layout: 'undistracted',
  mixins: [MixConfirmPage],
  data: () => ({}),
  computed: {},
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Confirm Page'
  }
};
</script>

<style lang="scss">
@import './styles/pages/checkout-confirm-page';
</style>
