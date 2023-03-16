<template>
  <ul 
    v-if="colorVariants.length > 1" 
    class="ca-color-variant-display"
  >
    <li
      v-for="(variant, index) in colorVariantsToDisplay"
      :key="index"
      :style="{'--variant-color': variant.color}"
      class="ca-color-variant-display__item"
    >
      <span 
        class="ca-color-variant-display__item-label" 
        :aria-label="variant.label"
      >
        {{ variant.label }}
      </span>
    </li>
    <li v-if="colorVariants.length > colorVariantsToDisplay.length">
      +{{ colorVariants.length - (limit - 1) }}
    </li>
  </ul>
</template>
<script>
// @group Molecules
// @vuese
export default {
  name: 'CaColorVariantDisplay',
  mixins: [],
  props: {
    limit: {
      type: Number,
      default: 3,
      validator(value) {
        return value > 1;
      }
    },
    variants: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({}),
  computed: {
    colorVariants() {
      return this.variants
        .filter(({ dimension }) => dimension === 'Color')
        .flatMap(({ group }) => group)
        .map((variant) => {
          const start = variant.value.indexOf('#');
          const color = start !== -1 ? variant.value.slice(start) : variant.value;
          
          return {...variant, color};
        });
    },
    colorVariantsToDisplay() {
      if (this.colorVariants.length <= this.limit) {
        return this.colorVariants;
      }

      return this.colorVariants.slice(0, this.limit - 1);
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-color-variant-display';
</style>

