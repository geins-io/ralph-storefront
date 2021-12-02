<template>
  <div class="ca-checkout-confirm-page">
    <CaContainer>
      <CaCheckoutHeader :title="$t('ORDER_CONFIRM_TITLE')" />
      <CaCheckoutSection :bottom-arrow="false">
        <CaCheckoutKlarna v-if="$route.query.kid" :confirm="true" />
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
import confirmCartQuery from 'cart/confirm.graphql';
import completeCartMutation from 'cart/complete.graphql';
import MixDatalayerConfirm from 'MixDatalayerConfirm';
export default {
  name: 'CheckoutConfirmPage',
  layout: 'undistracted',
  mixins: [MixDatalayerConfirm],
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
      return this.$route.query.cartid ?? '';
    },
    noCart() {
      return this.cartId === '' && this.orderCart === null;
    }
  },
  mounted() {},
  methods: {
    completeCart() {
      this.datalayerConfirm();
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
          this.cartCompleted = true;
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
.ca-checkout-confirm {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__icon {
    font-size: 40px;
    color: $c-success;
  }
  &__title {
    margin: $px20 0;
    font-size: $font-size-xxl;
    font-weight: $font-weight-bold;
  }
  &__text {
    font-size: $font-size-m;
    text-align: center;
    margin: 0 0 $px20;
  }
  &__id {
    font-size: $font-size-xl;
    color: $c-text-secondary;
  }
}
</style>
