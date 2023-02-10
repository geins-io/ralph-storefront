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
        <CaButton
          class="ca-klarna-error-page__button"
          size="l"
          :href="$getPath('index')"
        >
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
@import 'organisms/ca-klarna-error-page';
</style>
