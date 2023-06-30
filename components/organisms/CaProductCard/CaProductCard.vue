<template>
  <component :is="baseTag" class="ca-product-card">
    <div v-if="productPopulated" class="ca-product-card__image-wrap">
      <NuxtLink
        class="ca-product-card__image-link"
        tabindex="-1"
        :to="product.canonicalUrl"
        :data-alias="product.alias"
        @click.native="productClickHandler"
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
      <NuxtLink
        v-if="productPopulated"
        :to="product.canonicalUrl"
        @click.native="productClickHandler"
      >
        <CaBrandAndName
          :brand="product.brand.name"
          :name="product.name"
          name-tag="h2"
        />

        <CaPrice class="ca-product-card__price" :price="product.unitPrice" />
        <CaCampaigns
          v-if="product.discountCampaigns && product.discountCampaigns.length"
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
      <CaButton
        class="ca-product-card__buy-button"
        type="full-width"
        :loading="addToCartLoading"
        @clicked="addToCartClick"
      >
        {{
          skuId && product.totalStock.totalStock > 0
            ? $t('ADD')
            : $t('READ_MORE')
        }}
      </CaButton>
    </div>
  </component>
</template>
<script>
/*
  CaProductCard is a reusable component that displays a product card.
  It receives one prop:
  - product: an object containing the product data

  It emits an event when the product is clicked:
  - productclick: an object containing the product data
*/
import MixProductCard from 'MixProductCard';
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
<style lang="scss">
@import 'organisms/ca-product-card';
</style>
