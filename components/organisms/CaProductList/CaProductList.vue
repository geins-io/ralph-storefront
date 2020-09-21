<template>
  <ul v-if="products && products.length" class="ca-product-list">
    <CaProductCard
      v-for="(product, index) in products"
      :key="index"
      :product="product"
      :page-number="getPageNumber(index)"
    >
    </CaProductCard>
  </ul>
</template>
<script>
import CaProductCard from 'CaProductCard';
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
    },
    pageSize: {
      type: Number,
      required: true
    },
    skip: {
      type: Number,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    getPageNumber(index) {
      index++;
      return Math.ceil((index + this.skip) / this.pageSize);
    }
  }
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
