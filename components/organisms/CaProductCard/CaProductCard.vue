<template>
  <component :is="baseTag" class="ca-product-card">
    <div v-if="productPopulated" class="ca-product-card__image-wrap">
      <CaClickable
        class="ca-product-card__image-link"
        :href="product.canonicalUrl"
        :data-alias="product.alias"
        @clicked="productClickHandler"
      >
        <CaImage
          v-if="product.productImages && product.productImages.length > 0"
          class="ca-product-card__image"
          type="product"
          :size-array="
            $config.imageSizes.product.filter(
              (item) =>
                parseInt(item.descriptor) < 1150 &&
                parseInt(item.descriptor) > 186,
            )
          "
          :ratio="$config.productImageRatio"
          :filename="product.productImages[0].fileName"
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
      </CaClickable>
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
      <CaClickable
        v-if="productPopulated"
        tabindex="-1"
        :href="product.canonicalUrl"
        @clicked="productClickHandler"
      >
        <CaBrandAndName
          :brand="product.brand.name"
          :name="product.name"
          name-tag="h2"
        />

        <CaPrice class="ca-product-card__price" :price="product.unitPrice" />
        <CaCampaigns
          v-show="product.discountCampaigns && product.discountCampaigns.length"
          class="ca-product-card__campaigns"
          :campaigns="product.discountCampaigns || []"
        />
        <CaStockDisplay
          class="ca-product-card__stock-display"
          :stock="product.totalStock"
        />
      </CaClickable>
      <div v-else>
        <CaSkeleton class="ca-brand-and-name__brand" width="30%" />
        <CaSkeleton class="ca-brand-and-name__name" width="70%" />
        <CaSkeleton class="ca-product-card__price" width="50%" />
        <CaSkeleton class="ca-product-card__stock-display" width="40%" />
      </div>
      <CaButton
        v-if="productPopulated"
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
      <CaSkeleton
        v-else
        class="ca-product-card__buy-button"
        width="100%"
        height="43px"
      />
    </div>
  </component>
</template>
<script>
/*
  This product is the main component for displaying a product card. 
  To understand more about this component, please read the documentation for the MixProductCard in Ralph UI
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
  methods: {},
};
</script>
<style lang="scss">
@import 'organisms/ca-product-card';
</style>
