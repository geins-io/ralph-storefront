<template>
  <CaAccountPage class="ca-order-page">
    <h2 class="ca-order-page__title">
      {{ $t('ACCOUNT_ORDERS_IN_PROGRESS') }}
    </h2>
    <CaOrderSummary />
  </CaAccountPage>
</template>

<script>
export default {
  middleware: 'authenticated',
  name: 'OrdersPage',
  transition: 'no-transition',
  data: () => ({}),
  methods: {}
};
</script>

<style lang="scss">
.ca-order-page {
  &__title {
    font-size: $font-size-m;
    font-weight: $font-weight-bold;
    margin: 0 0 $px10;
    @include bp(tablet) {
      font-size: $font-size-l;
    }
  }
}
</style>
