<template>
  <div class="ca-checkout-page">
    <CaContainer>
      <CaCheckout :avarda-script-loaded="avardaScriptLoaded" />
    </CaContainer>
  </div>
</template>

<script>
import MixCheckoutPage from 'MixCheckoutPage';
/*

  Renders the checkout page.

  layout: undistracted - removes the header and footer

*/
export default {
  name: 'CheckoutPage',
  layout: 'undistracted',
  mixins: [MixCheckoutPage],
  data: () => ({}),
  methods: {},
  meta: {
    pageType: 'Checkout Page'
  }
};
</script>

<style lang="scss"></style>
