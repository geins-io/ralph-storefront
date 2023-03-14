<template>
  <section class="ca-product-info">
    <h3 class="ca-product-info__title">{{ title }}</h3>
    <div class="ca-product-info__text">
      <slot></slot>
    </div>
  </section>
</template>
<script>
// @group Atoms
// @vuese
export default {
  name: 'CaProductInfo',
  mixins: [],
  props: {
    // The title of the product info
    title: {
      type: String,
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
@import 'atoms/ca-product-info';
</style>
