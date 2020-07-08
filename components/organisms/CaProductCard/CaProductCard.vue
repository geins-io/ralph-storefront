<template>
  <component :is="baseTag" class="ca-product-card">
    <div class="ca-product-card__image-wrap">
      <NuxtLink class="ca-product-card__image-link" :to="'/p/' + product.alias">
        <CaImage
          v-if="product.images !== null && product.images.length > 0"
          class="ca-product-card__image"
          type="product"
          size="300f300"
          :filename="product.images[0]"
          :placeholder="
            require('~/assets/placeholders/product-image-square.png')
          "
        />
        <img
          v-else
          class="ca-product-card__image"
          :src="require('~/assets/placeholders/product-image-square.png')"
        />
      </NuxtLink>
      <CaToggleFavorite
        class="ca-product-card__favorite"
        :prod-id="product.productId"
      />
    </div>
    <div class="ca-product-card__info">
      <NuxtLink :to="'/p/' + product.alias">
        <CaBrandAndName
          :brand="product.brandName"
          :name="product.name"
          name-tag="h2"
        />
        <CaPrice class="ca-product-card__price" :price="product.price" />
      </NuxtLink>
    </div>
  </component>
</template>
<script>
import { CaButton, CaImage } from '@ralph/ralph-ui';
import CaBrandAndName from 'CaBrandAndName';
import CaPrice from 'CaPrice';
import CaToggleFavorite from 'CaToggleFavorite';
// @group Organisms
// @vuese
export default {
  name: 'CaProductCard',
  components: { CaButton, CaImage, CaBrandAndName, CaPrice, CaToggleFavorite },
  mixins: [],
  props: {
    baseTag: {
      type: String,
      default: 'li'
    },
    product: {
      type: Object,
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
<style lang="scss" scoped>
.ca-product-card {
  position: relative;
  width: calc(50% - (#{$list-spacing * 2}));
  margin: $list-spacing;
  @include bp(tablet) {
    width: calc(33.33333% - (#{$list-spacing * 2}));
  }
  @include bp(laptop) {
    width: calc(20% - (#{$list-spacing * 2}));
  }
  &__image-wrap {
    line-height: 0;
    position: relative;
  }
  &__info {
    padding-top: $px12;
    display: block;
  }
  &__price {
    margin-top: $px4;
  }

  ::v-deep .ca-toggle-favorite {
    width: 36px;
    height: 36px;
    top: auto;
    right: $px12;
    bottom: $px12;
  }
}
</style>
