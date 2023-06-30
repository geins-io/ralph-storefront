<template>
  <component :is="baseTag" class="ca-product-card">
    <CaBadge v-if="isNew" value="NEW" class="ca-product-card__new-badge" />
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
          :class="{
            'ca-product-card__image--has-second': product.images.length > 1
          }"
          type="product"
          :size-array="
            $config.imageSizes.product.filter(
              item =>
                parseInt(item.descriptor) < 1150 &&
                parseInt(item.descriptor) > 186
            )
          "
          :ratio="$config.productImageRatio"
          :filename="getPrimaryImage"
          :alt="product.brand.name + ' ' + product.name"
          :sizes="imgSizesProductCard"
        />
        <CaImage
          v-else
          class="ca-product-card__image"
          :ratio="$config.productImageRatio"
          :src="require('~/assets/placeholders/product-image-square.png')"
          :alt="product.brand.name + ' ' + product.name"
        />
        <CaImage
          v-if="
            product.images !== null && product.images.length > 1 && isDesktop
          "
          class="ca-product-card__image ca-product-card__image--second-image"
          type="product"
          :size-array="
            $config.imageSizes.product.filter(
              item =>
                parseInt(item.descriptor) < 1150 &&
                parseInt(item.descriptor) > 186
            )
          "
          :ratio="$config.productImageRatio"
          :filename="getSecondaryImage"
          :alt="product.brand.name + ' ' + product.name"
          :sizes="imgSizesProductCard"
        />
      </NuxtLink>
      <CaDiscountBadge
        class="ca-product-card__discount"
        :price="product.unitPrice"
        :price-type="product.discountType"
      />
      <CaToggleFavorite
        class="ca-product-card__favorite"
        :prod-alias="product.alias"
        :prod-id="product.productId"
        :product="product"
      />

      <ul class="ca-product-card__badge-list">
        <li v-for="(item, index) in badges" :key="index">
          <CaBadge :value="item" />
        </li>
      </ul>
      <CaIconButton
        icon-name="shopping-bag"
        aria-label="Snabbväljare"
        class="ca-product-card__quickshop"
        @clicked="$store.dispatch('quickshop/open', product)"
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
        class="ca-product-card__content"
        @click.native="productClickHandler"
      >
        <CaPrice
          class="ca-product-card__price"
          :price="product.unitPrice"
          :type="product.discountType"
        />

        <CaCampaigns
          v-if="product.discountCampaigns && product.discountCampaigns.length"
          class="ca-product-card__campaigns"
          :campaigns="product.discountCampaigns"
        />
        <CaBrandAndName
          :brand="product.brand.name"
          :name="product.name"
          name-tag="h2"
          class="ca-product-card__brand-and-name"
        />

        <CaColorVariantDisplay
          :variants="product.variantDimensions"
          class="ca-product-card__color-variants"
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
/*
  CaProductCard is a reusable component that displays a product card.
  It receives one prop:
  - product: an object containing the product data

  It emits an event when the product is clicked:
  - productclick: an object containing the product data
*/
import MixProductCard from 'MixProductCard';
import { VoyadoProductCard } from '@geins/ralph-module-voyado-elevate';
export default {
  name: 'CaProductCard',
  mixins: [MixProductCard, VoyadoProductCard],
  props: {},
  data: () => ({
    imgSizesProductCard:
      '(min-width: 1900px) 467px, (min-width: 1024px) 24vw, (min-width: 768px) 32vw, 50vw'
  }),
  computed: {
    isDesktop() {
      return this.$store.getters.viewportComputer;
    },
    isNew() {
      if (this.product.firstAvailableOn) {
        const now = new Date();
        const firstAvailableDate = new Date(this.product.firstAvailableOn);
        const oneDay = 1000 * 60 * 60 * 24;
        const oneWeek = oneDay * 7;

        return now - firstAvailableDate < oneWeek;
      } else {
        return false;
      }
    },
    badges() {
      const attrGroup = this.product.parameterGroups?.find(
        group => group.name === 'Artikelattribut'
      );

      if (!attrGroup) {
        return [];
      }

      const badges = attrGroup.parameters
        .filter(attr => attr.name === 'Badges')
        .map(badge => badge.value);

      return badges;
    },
    prioritizeTag() {
      if (this.$store.getters['lastVisited/isCurve']) {
        return 'Curve';
      }
      if (this.$store.getters['lastVisited/isStudent']) {
        return 'Studenten';
      }

      return '';
    },
    imageWithTag() {
      if (!this.productPopulated) {
        return null;
      }
      return this.product.productImages.find(image =>
        image.tags.includes(this.prioritizeTag)
      );
    },
    hasTwoImages() {
      if (!this.productPopulated) {
        return false;
      }
      if (!this.product.productImages) {
        return this.product.images.length > 1;
      }
      return this.product.productImages.length > 1;
    },
    getPrimaryImage() {
      if (!this.productPopulated) {
        return '';
      }
      if (!this.product.productImages) {
        return this.product.images[0];
      }
      if (!this.prioritizeTag || !this.imageWithTag) {
        return this.product.productImages[0].fileName;
      } else {
        return this.imageWithTag.fileName;
      }
    },
    getSecondaryImage() {
      if (!this.productPopulated) {
        return '';
      }
      if (!this.hasTwoImages) {
        return this.product.images[0];
      }
      if (!this.product.productImages) {
        return this.product.images[1];
      }
      return this.product.productImages[1].fileName;
    }
  },
  watch: {},
  created() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-product-card';
</style>
