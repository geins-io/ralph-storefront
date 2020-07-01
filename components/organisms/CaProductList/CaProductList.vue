<template>
  <ul v-if="products && products.length" class="ca-product-list">
    <CaProductCard
      v-for="(product, index) in products"
      :key="index"
      :product="product"
    >
    </CaProductCard>
  </ul>
</template>
<script>
import CaProductCard from '@/components/organisms/CaProductCard/CaProductCard';
// @group Organisms
// @vuese
export default {
  name: 'CaProductList',
  components: { CaProductCard },
  mixins: [],
  props: {
    products: {
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
.ca-product-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: -$list-spacing;
}
</style>
