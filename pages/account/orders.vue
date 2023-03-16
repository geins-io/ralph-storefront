<template>
  <CaAccountPage class="ca-orders-page">
    <client-only>
      <div v-if="ordersInProgress.length" class="ca-orders-page__in-progress">
        <h2 class="ca-orders-page__title">
          {{ $t('ACCOUNT_ORDERS_IN_PROGRESS') }} ({{ ordersInProgress.length }})
        </h2>
        <CaOrderSummary
          v-for="order in ordersInProgress"
          :key="order.id"
          class="ca-orders-page__order"
          :order="order"
        />
      </div>
      <div v-if="orderHistory.length" class="ca-orders-page__history">
        <h2 class="ca-orders-page__title">
          {{ $t('ACCOUNT_ORDER_HISTORY') }} ({{ orderHistory.length }})
        </h2>
        <CaOrderSummary
          v-for="order in orderHistory"
          :key="order.id"
          class="ca-orders-page__order"
          :order="order"
        />
      </div>
      <div v-if="orders && orders.length === 0" class="ca-orders-page__empty">
        {{ $t('ACCOUNT_ORDERS_EMPTY') }}
      </div>
      <CaSpinner class="ca-orders-page__spinner" :loading="orders === null" />
    </client-only>
  </CaAccountPage>
</template>

<script>
/*
  Renders the orders page.

  apollo:
    getOrders: The orders query.

  data:
    orders: The orders object.
    inProgressStatuses: The statuses that are considered in progress.
    historyStatuses: The statuses that are considered history.
  
  computed:
    ordersInProgress: The orders that are in progress.
    orderHistory: The orders that are in history.

  methods:
    mapStatus: Maps the status to the correct status.
    splitOrders: Splits the orders into in progress and history.
*/
import getOrdersQuery from 'user/orders.graphql';
export default {
  middleware: 'authenticated',
  name: 'OrdersPage',
  transition: 'no-transition',
  apollo: {
    getOrders: {
      query: getOrdersQuery,
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      result(result) {
        if (result.data) {
          this.orders = result.data.getOrders;
        }
      },
      error(error) {
        this.$nuxt.error({ statusCode: 500, message: error });
      }
    }
  },
  data: () => ({
    orders: null,
    inProgressStatuses: ['received', 'processing'],
    historyStatuses: ['cancelled', 'completed']
  }),
  computed: {
    ordersInProgress() {
      return this.splitOrders(this.inProgressStatuses);
    },
    orderHistory() {
      return this.splitOrders(this.historyStatuses);
    }
  },
  created() {},
  methods: {
    mapStatus(status) {
      switch (status) {
        case 'pending':
        case 'pending-payment':
        case 'backorder':
          return 'received';
        case 'partial':
        case 'inactive':
        case 'on-hold':
          return 'processing';
        case 'cancelled':
        case 'out-of-stock':
          return 'cancelled';
        case 'completed':
        case 'refunded':
          return 'completed';
        default:
          return status;
      }
    },
    splitOrders(statusArray) {
      const arr = this.orders
        ? this.orders.map(i => {
            i.status = this.mapStatus(i.status);
            return i;
          })
        : [];
      return arr.filter(i => statusArray.includes(i.status));
    }
  },
  meta: {
    pageType: 'Orders Page'
  }
};
</script>

<style lang="scss">
@import './styles/pages/orders-page';
</style>
