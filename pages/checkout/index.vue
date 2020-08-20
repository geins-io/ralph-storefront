<template>
  <div class="ca-checkout-page">
    <CaContainer>
      <CaCheckout />
    </CaContainer>
  </div>
</template>

<script>
import CaContainer from 'CaContainer';
import CaCheckout from 'CaCheckout';

export default {
  name: 'CheckoutPage',
  layout: 'undistracted',
  components: { CaContainer, CaCheckout },
  data: () => ({}),
  methods: {}
};
</script>

<style lang="scss"></style>
