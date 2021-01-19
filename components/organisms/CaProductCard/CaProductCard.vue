<template>
  <component :is="baseTag" class="ca-product-card" @click="productClickHandler">
    <div v-if="productPopulated" class="ca-product-card__image-wrap">
      <NuxtLink
        class="ca-product-card__image-link"
        tabindex="-1"
        :to="'/p/' + product.alias"
        :data-alias="product.alias"
      >
        <CaImage
          v-if="product.images !== null && product.images.length > 0"
          class="ca-product-card__image"
          type="product"
          size="300f300"
          :ratio="$config.productImageRatio"
          :filename="product.images[0]"
          :alt="product.brand.name + ' ' + product.name"
        />
        <CaImage
          v-else
          class="ca-product-card__image"
          :ratio="$config.productImageRatio"
          :src="require('~/assets/placeholders/product-image-square.png')"
          :alt="product.brand.name + ' ' + product.name"
        />
      </NuxtLink>
      <CaToggleFavorite
        class="ca-product-card__favorite"
        :prod-id="product.productId"
      />
    </div>
    <CaSkeleton
      v-else
      class="ca-product-card__image-wrap"
      :ratio="$config.productImageRatio"
      :radius="false"
    />

    <div class="ca-product-card__info">
      <NuxtLink v-if="productPopulated" :to="'/p/' + product.alias">
        <CaBrandAndName
          :brand="product.brand.name"
          :name="product.name"
          name-tag="h2"
        />
        <CaPrice class="ca-product-card__price" :price="product.unitPrice" />
      </NuxtLink>
      <div v-else>
        <CaSkeleton width="30%" />
        <CaSkeleton width="70%" />
        <CaSkeleton width="50%" />
      </div>
    </div>
  </component>
</template>
<script>
// @group Organisms
// @vuese
export default {
  name: 'CaProductCard',
  mixins: [],
  props: {
    baseTag: {
      type: String,
      default: 'li'
    },
    product: {
      type: Object,
      required: true
    },
    pageNumber: {
      type: Number,
      default: 0
    }
  },
  data: () => ({}),
  computed: {
    productPopulated() {
      return Object.keys(this.product).length > 0;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    productClickHandler() {
      if (this.pageNumber > 0) {
        this.$store.commit('list/setRelocatePage', this.pageNumber);
        this.$store.commit('list/setRelocateAlias', this.product.alias);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.ca-product-card {
  position: relative;
  &__image-wrap {
    line-height: 0;
    position: relative;
  }

  &__image-link {
    display: block;
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
