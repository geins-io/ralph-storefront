<template>
  <CaAccountPage class="ca-order-page">
    <h2 class="ca-order-page__title">
      {{ $t('ACCOUNT_ORDERS_IN_PROGRESS') }}
    </h2>
    <CaOrderSummary v-for="order in getOrders" :key="order.id" :order="order" />
  </CaAccountPage>
</template>

<script>
import getOrdersQuery from 'user/orders.graphql';
export default {
  middleware: 'authenticated',
  name: 'OrdersPage',
  transition: 'no-transition',
  apollo: {
    getOrders: {
      query: getOrdersQuery,
      variables() {
        return {
          apiKey: this.$config.apiKey.toString()
        };
      },
      fetchPolicy: 'cache-and-network',
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  data: () => ({}),
  created() {},
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
