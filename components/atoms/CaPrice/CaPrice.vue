<template>
  <div class="ca-price" :class="modifiers">
    <span class="ca-price__selling">{{ sellingPrice }}</span>
    <span v-if="isSale" class="ca-price__regular">{{ regularPrice }}</span>
  </div>
</template>
<script>
// @group Atoms
// @vuese
export default {
  name: 'CaPrice',
  components: {},
  mixins: [],
  props: {
    sellingPrice: {
      type: String,
      required: true
    },
    isSale: {
      type: Boolean,
      default: false
    },
    regularPrice: {
      type: String,
      default: ''
    }
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-price--sale': this.isSale
      };
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-price {
  &__selling {
    font-size: 1.2em;
    font-weight: $font-weight-bold;
  }
  &__regular {
    text-decoration: line-through;
    color: $c-text-secondary;
    margin-left: $px4;
  }
  &--sale & {
    &__selling {
      color: $c-sale;
    }
  }
}
</style>
