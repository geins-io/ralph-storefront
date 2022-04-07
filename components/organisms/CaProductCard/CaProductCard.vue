<template>
  <component :is="baseTag" class="ca-product-card" @click="productClickHandler">
    <div v-if="productPopulated" class="ca-product-card__image-wrap">
      <NuxtLink
        class="ca-product-card__image-link"
        tabindex="-1"
        :to="product.canonicalUrl"
        :data-alias="product.alias"
      >
        <CaImage
          v-if="product.images !== null && product.images.length > 0"
          class="ca-product-card__image"
          type="product"
          :size-array="
            $config.imageSizes.product.filter(
              item =>
                parseInt(item.descriptor) < 1150 &&
                parseInt(item.descriptor) > 186
            )
          "
          :ratio="$config.productImageRatio"
          :filename="product.images[0]"
          :alt="product.brand.name + ' ' + product.name"
          sizes="(min-width: 1360px) 248px, (min-width: 1024px) 18.23vw, (min-width: 768px) 30.73vw, 48vw"
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
        :prod-alias="product.alias"
      />
    </div>
    <CaSkeleton
      v-else
      class="ca-product-card__image-wrap"
      :ratio="$config.productImageRatio"
      :radius="false"
    />

    <div class="ca-product-card__info">
      <NuxtLink v-if="productPopulated" :to="product.canonicalUrl">
        <CaBrandAndName
          :brand="product.brand.name"
          :name="product.name"
          name-tag="h2"
        />

        <CaPrice class="ca-product-card__price" :price="product.unitPrice" />
        <CaCampaigns
          v-if="product.discountCampaigns"
          class="ca-product-card__campaigns"
          :campaigns="product.discountCampaigns"
        />
        <CaStockDisplay
          class="ca-product-card__stock-display"
          :stock="product.totalStock"
        />
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
import MixProductCard from 'MixProductCard';

// @group Organisms
// @vuese
export default {
  name: 'CaProductCard',
  mixins: [MixProductCard],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  created() {},
  methods: {}
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
  &__campaigns {
    margin: rem-calc(5) 0 0;
  }
  &__stock-display {
    font-size: $font-size-xs;
    margin: $px10 0 0;
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
