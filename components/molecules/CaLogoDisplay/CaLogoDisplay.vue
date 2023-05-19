<template>
  <ul class="ca-logo-display">
    <li
      v-for="(logo, index) in logos"
      :key="index"
    >
      <CaSvgAsset
        class="ca-logo-display__item"
        folder="logos"
        :filename="logo.name"
        :alt="`${logo.name} logo`"
      />
    </li>
  </ul>
</template>
<script>
// @group Molecules
// @vuese
export default {
  name: 'CaLogoDisplay',
  mixins: [],
  props: {
    type: {
      type: String,
      default: 'all',
      validator(value) {
        return ['all', 'shipping', 'payment'].includes(value);
      }
    }
  },
  data: () => ({}),
  computed: {
    logos() {
      let logoArray = this.$config.paymentAndDeliveryLogos;

      if (this.$store.state.channel.currentMarket === 'dk') {
        logoArray = logoArray.filter(({ name }) => name !== 'paypal');
      }

      if (this.type === 'all') {
        return logoArray;
      }

      return logoArray.filter(x => x.type === this.type);
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-logo-display';
</style>

