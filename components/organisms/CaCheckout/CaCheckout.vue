<template>
  <div class="ca-checkout">
    <CaCheckoutHeader :title="$t('CHECKOUT')" />
    <button
      v-if="!$store.getters['auth/authenticated']"
      type="button"
      class="ca-checkout__login"
      @click="
        $store.commit('contentpanel/open', {
          name: 'account',
          frame: 'login'
        })
      "
    >
      {{ $t('LOG_IN') }}/{{ $t('CREATE_ACCOUNT') }}
    </button>

    <CaCheckoutSection
      :bottom-arrow="$store.getters['cart/totalQuantity'] > 0"
      :loading="cartLoading"
    >
      <template #title>
        {{ $t('CART') }}
      </template>
      <CaCart
        v-if="cart.data"
        :cart="cart.data"
        @loading="cartLoading = $event"
      />
    </CaCheckoutSection>

    <CaCheckoutSection
      v-if="$store.getters['cart/totalQuantity'] > 0"
      ref="paymentSection"
      :bottom-arrow="false"
      :loading="
        !checkout ||
          (checkoutLoading && paymentType === 'STANDARD') ||
          frameLoading ||
          !selectedPaymentOption
      "
    >
      <template #title>
        {{ $t('COMPLETE_ORDER') }}
      </template>
      <CaFeedback
        v-show="customerStatus !== 'ok'"
        ref="feedback"
        :type="currentFeedback.type"
        :constant="true"
        class="ca-checkout__feedback"
      >
        <h3 class="ca-checkout__feedback-title">{{ currentFeedback.title }}</h3>
        <p class="ca-checkout__feedback-text">{{ currentFeedback.text }}</p>
      </CaFeedback>
      <CaCheckoutExternal
        v-if="
          selectedPaymentOption &&
            avardaScriptLoaded &&
            customerStatus !== 'blacklisted'
        "
        ref="externalcheckout"
        :data="selectedPaymentOption.paymentData"
        :new-checkout-session="selectedPaymentOption.newCheckoutSession"
        :type="paymentType"
      />
      <span v-else class="ca-checkout__loading-placeholder" />
      <template #guard>
        {{ $t('CHECKOUT_PAYMENT_GUARD') }}
      </template>
    </CaCheckoutSection>
  </div>
</template>
<script>
/*
  This component is the main checkout component. It holds the different sections of the checkout.
  It also handles the different checkout steps and the different payment options.

  The checkout is divided into 3 or 4 steps:
  1. Cart
  (2. Market/Country)
  3. Shipping
  4. Payment

  The checkout has 4 different standard payment options:
  1. Invoice
  2. Klarna
  3. Svea
  4. Walley
  5. Avarda

*/

import MixCheckout from 'MixCheckout';
import { mapGetters } from 'vuex';
export default {
  name: 'CaCheckout',
  mixins: [MixCheckout],
  props: {
    avardaScriptLoaded: {
      type: Boolean,
      required: true
    }
  },
  data: vm => ({
    feedback: {
      blacklisted: {
        title: vm.$t('CHECKOUT_FEEDBACK_BLACKLISTED_TITLE'),
        text: vm.$t('CHECKOUT_FEEDBACK_BLACKLISTED_TEXT'),
        type: 'error'
      },
      limited: {
        title: vm.$t('CHECKOUT_FEEDBACK_LIMITED_TITLE'),
        text: vm.$t('CHECKOUT_FEEDBACK_LIMITED_TEXT'),
        type: 'error'
      }
    },
    currentFeedback: {
      title: '',
      text: '',
      type: 'error'
    }
  }),
  computed: {
    ...mapGetters({
      customerStatus: 'avarda/customerStatus'
    })
  },
  watch: {
    customerStatus(newVal) {
      if (newVal === 'ok') {
        return;
      }
      this.currentFeedback = this.feedback[newVal];
      this.$nextTick(() => {
        this.$refs.paymentSection.$el.scrollIntoView({ behavior: 'smooth' });
      });
    }
  },
  mounted() {},
  beforeDestroy() {
    this.$store.commit('avarda/setCustomerValidation', null);
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
    }
  }
};
</script>
<style lang="scss">
@import 'organisms/ca-checkout';
</style>
