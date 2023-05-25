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
    currentMarket() {
      return this.$store.state.channel.currentMarket;
    },
    logos() {
      const logoArray = this.getLogosForMarket(this.currentMarket);

      if (this.type === 'all') {
        return logoArray;
      }

      return logoArray.filter(x => x.type === this.type);
    }
  },
  watch: {},
  mounted() {},
  methods: {
    getLogosForMarket(market) {
      const marketLogos = this.$config.paymentAndDeliveryLogosByMarket[market] || [];
      const allLogos = this.$config.paymentAndDeliveryLogos;

      return allLogos.filter(({ name }) => marketLogos.includes(name));
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-logo-display';
</style>

