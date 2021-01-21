<template>
  <div class="ca-klarna-error-page">
    <CaContainer>
      <CaCheckoutHeader :title="$t('CHECKOUT')" />
      <CaCheckoutSection
        class="ca-klarna-error-page__section"
        :bottom-arrow="false"
      >
        <CaIcon class="ca-klarna-error-page__icon" name="alert-triangle" />
        <h1 class="ca-klarna-error-page__title">
          {{ errorMessage }}
        </h1>
        <CaButton class="ca-klarna-error-page__button" size="l" href="/">
          {{ $t('GO_BACK') }}
        </CaButton>
      </CaCheckoutSection>
    </CaContainer>
  </div>
</template>

<script>
export default {
  name: 'KlarnaErrorPage',
  layout: 'undistracted',
  data: () => ({}),
  computed: {
    errorMessage() {
      let msg = this.$t('KLARNA_FAIL');
      switch (this.$route.query.error) {
        case 'Error':
          msg = this.$t('KLARNA_FAIL_ERROR');
          break;
        case 'OutOfStock':
          msg = this.$t('KLARNA_FAIL_OUTOFSTOCK');
          break;
        case 'BlockedCustomer':
          msg = this.$t('KLARNA_FAIL_BLOCKED');
          break;
      }
      return msg;
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.ca-klarna-error-page {
  max-width: $checkout-width;
  margin: 0 auto;
  padding-bottom: $px32;
  &__section .ca-checkout-section__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__title {
    font-size: $font-size-xl;
  }
  &__icon {
    color: $c-error;
    margin-right: $px12;
    border-radius: 50%;
    font-size: 40px;
    margin-bottom: $px32;
  }
  &__button {
    margin-top: $px24;
  }
}
</style>
