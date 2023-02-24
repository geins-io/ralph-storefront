<template>
  <div class="ca-checkout-page">
    <CaContainer>
      <CaCheckout />
    </CaContainer>
  </div>
</template>

<script>
/*

  Renders the checkout page.

  layout: undistracted - removes the header and footer

*/
export default {
  name: 'CheckoutPage',
  layout: 'undistracted',
  data: () => ({}),
  methods: {},
  meta: {
    pageType: 'Checkout Page'
  }
};
</script>

<style lang="scss"></style>
