<template>
  <ul class="ca-logo-display">
    <li
      v-for="(logo, index) in logoArraySrc"
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
    logoArraySrc: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-logo-display';
</style>

