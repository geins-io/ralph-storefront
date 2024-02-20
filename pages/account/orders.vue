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

  mixins: MixAccountOrders

*/
import MixAccountOrders from 'MixAccountOrders';
export default {
  name: 'OrdersPage',
  mixins: [MixAccountOrders],
  meta: {
    pageType: 'Orders Page',
  },
};
</script>

<style lang="scss">
@import './styles/pages/orders-page';
</style>
