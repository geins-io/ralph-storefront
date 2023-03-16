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
      if(this.type === 'all') {
        return this.$config.paymentAndDeliveryLogos;
      }

      return this.$config.paymentAndDeliveryLogos.filter(x => x.type === this.type);
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

