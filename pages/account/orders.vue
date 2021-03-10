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
      context() {
        return {
          headers: this.$store.state.auth.headers
        };
      },
      errorPolicy: 'all',
      result(result) {
        // if (result.errors?.length) {
        //   this.refreshToken().then(result => {
        //     if (result) {
        //       this.$apollo.queries.getOrders.refetch();
        //     }
        //   });
        // }
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  data: () => ({}),
  created() {},
  methods: {
    refreshToken() {
      return this.$store.dispatch('auth/refreshToken');
    }
  }
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
