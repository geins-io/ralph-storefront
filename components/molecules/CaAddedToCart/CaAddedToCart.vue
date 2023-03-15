<template>
  <div class="ca-added-to-cart" :class="modifiers">
    <CaOverlay
      class="ca-added-to-cart__overlay"
      :visible="visible"
      @clicked="close"
    />
    <CaContainer class="ca-added-to-cart__container">
      <div
        class="ca-added-to-cart__box"
        :class="{ 'ca-added-to-cart__box--visible': visible }"
      >
        <div class="ca-added-to-cart__header">
          <div class="ca-added-to-cart__title">
            {{ $tc('CART_ITEM_ADDED', quantity) }}
          </div>
          <CaIconButton
            class="ca-added-to-cart__close"
            icon-name="x"
            :aria-label="$t('CLOSE')"
            @clicked="close"
          />
        </div>
        <div class="ca-added-to-cart__body">
          <transition name="fade">
            <CaCartProduct
              v-if="visible"
              class="ca-added-to-cart__product"
              :item="cart.added"
              mode="display"
            />
          </transition>
          <div class="ca-added-to-cart__sum">
            {{ $t('MINI_CART_SUM', { sum: cartTotal }) }}
          </div>
          <div v-if="freeShipping" class="ca-added-to-cart__shipping-notice">
            <CaIconAndText icon-name="check-round" icon-position="left">
              {{ $t('MINI_CART_SHIPPING') }}
            </CaIconAndText>
          </div>
          <div @click="close">
            <CaButton
              type="full-width"
              size="m"
              href="checkout"
              class="ca-added-to-cart__cart-btn"
            >
              <CaIconAndText
                v-if="buttonIcon"
                :icon-name="buttonIcon"
                icon-position="right"
              >
                {{ $t('CART_TO_CHECKOUT') }}
              </CaIconAndText>
              <template v-else>{{ $t('CART_TO_CHECKOUT') }}</template>
            </CaButton>
          </div>
        </div>
      </div>
    </CaContainer>
  </div>
</template>
<script>
import { mapState } from 'vuex';
// @group Molecules
// @vuese
// Added to cart notification<br><br>
// **SASS-path:** _./styles/components/molecules/ca-added-to-cart.scss_
export default {
  name: 'CaAddedToCart',
  mixins: [],
  props: {
    buttonIcon: {
      type: String,
      default: ''
    }
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-added-to-cart--header-hidden': this.$store.state.headerHidden,
        'ca-added-to-cart--header-scrolled': !this.$store.getters.siteIsAtTop
      };
    },
    cartData() {
      return this.cart.data;
    },
    cartTotal() {
      return this.cartData?.summary?.total.sellingPriceIncVatFormatted;
    },
    freeShipping() {
      return this.cartData?.summary?.shipping.amountLeftToFreeShipping === 0;
    },
    // @vuese
    // Is the notification visible
    // @type Boolean
    visible() {
      return this.cart.added !== null;
    },
    // @vuese
    // How many was added?
    // @type Number
    quantity() {
      return this.visible ? this.cart.added.quantity : 1;
    },
    ...mapState(['cart'])
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Close the notification
    close() {
      this.$store.dispatch('cart/removeAddedNotification');
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-added-to-cart';
</style>
