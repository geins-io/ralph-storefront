<template>
  <div class="ca-checkout-confirm-page">
    <CaContainer>
      <CaCheckoutHeader :title="$t('ORDER_CONFIRM_TITLE')" />
      <CaCheckoutSection :bottom-arrow="false">
        <CaCheckoutKlarna :confirm="true" />
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
import confirmCartQuery from 'cart/confirm.graphql';
import completeCartMutation from 'cart/complete.graphql';
export default {
  name: 'CheckoutConfirmPage',
  layout: 'undistracted',
  apollo: {
    getCart: {
      query: confirmCartQuery,
      variables() {
        return {
          id: this.cartId
        };
      },
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      result(result) {
        if (result.data && result.data.getCart) {
          this.orderCart = result.data.getCart;
          if (!this.orderCart.isCompleted) {
            this.completeCart();
          }
        }
      },
      skip() {
        return this.cartId === '' || this.orderCart !== null;
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  data: () => ({
    orderCart: null
  }),
  computed: {
    cartId() {
      return this.$route.query.cid ?? '';
    },
    noCart() {
      return this.cartId === '' && this.orderCart === null;
    }
  },
  mounted() {},
  methods: {
    completeCart() {
      this.$apollo
        .mutate({
          mutation: completeCartMutation,
          variables: {
            id: this.cartId
          },
          fetchPolicy: 'no-cache'
        })
        .then(() => {
          this.$store.dispatch('cart/reset');
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.ca-checkout-confirm-page {
  max-width: $checkout-width;
  margin: 0 auto;
  padding-bottom: $px32;
  &__title {
    font-size: $font-size-xl;
    text-align: center;
  }
  &__no-cart {
    text-align: center;
    color: $c-text-secondary;
  }
}
</style>
