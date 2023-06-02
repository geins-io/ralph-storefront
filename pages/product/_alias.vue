<template>
  <div class="ca-product-page">
    <CaProductMeta v-if="product" :product="product" />
    <CaContainer>
      <CaBreadcrumbs
        v-if="product"
        :current="breadcrumbsCurrent"
        :product-name="product.name"
      />
      <CaSkeleton v-else class="ca-breadcrumbs" width="20%" />
      <section class="ca-product-page__section">
        <div class="ca-product-page__gallery-wrap">
          <CaProductGallery
            v-if="product"
            ref="gallery"
            class="ca-product-page__gallery"
            :images="productImages"
            :alt="product.brand.name + ' ' + product.name"
            :video-id="videoId"
            thumbnail-mode="grid"
          />

          <div v-else class="ca-product-page__gallery ca-product-gallery">
            <div
              class="only-computer ca-product-gallery__thumbnails ca-product-gallery__thumbnails--grid"
            >
              <div
                v-for="index in 4"
                :key="index"
                class="ca-clickable ca-product-gallery__thumbnail-container ca-product-gallery__thumbnail-container--grid"
              >
                <CaSkeleton
                  class="ca-product-gallery__image"
                  :ratio="$config.productImageRatio"
                  :radius="false"
                />
              </div>
            </div>
            <div class="ca-product-gallery__slider only-mobile">
              <div class="ca-product-gallery__main">
                <div class="ca-product-gallery__slider ca-slider">
                  <div class="ca-slider__lane-wrap">
                    <div
                      class="ca-slider__lane"
                      style="--current-slide:5; --slider-offset:0;"
                    >
                      <div
                        v-for="index in 2"
                        :key="index"
                        class="ca-slide ca-product-gallery__slide"
                      >
                        <CaSkeleton
                          class="ca-product-gallery__image"
                          :ratio="$config.productImageRatio"
                          :radius="false"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ca-product-page__icon-wrap">
            <CaToggleFavorite
              v-if="product"
              class="ca-product-page__favorite"
              :prod-alias="prodAlias"
              :prod-id="product.productId"
              :product="voyadoProduct"
            />
            <CaIconButton
              v-if="product && videoId"
              icon-name="play"
              aria-label="Play video"
              class="ca-product-page__video-button"
              @clicked="scrollToGalleryVideo"
            />
          </div>
        </div>

        <div
          v-if="product"
          class="ca-product-page__main"
          :class="mainModifiers"
        >
          <div class="ca-product-page__price-wrap">
            <CaPrice
              class="ca-product-page__price"
              :price="product.unitPrice"
              :type="product.discountType"
            />
            <p
              v-if="product.unitPrice.isDiscounted"
              class="ca-product-page__lowest-price"
            >
              {{ $t('PREVIOUS_LOWEST_PRICE') }}: {{ lowestPrice }}
            </p>
            <CaCampaigns
              v-if="product.discountCampaigns"
              class="ca-product-page__campaigns"
              :campaigns="product.discountCampaigns"
            />
          </div>

          <CaBrandAndName
            class="ca-product-page__brand-and-name"
            :brand="product.brand.name"
            :brand-alias="product.brand.canonicalUrl"
            :name="product.name"
            name-tag="h1"
          />

          <div class="ca-product-page__buy-wrap">
            <button
              v-if="product.variantGroup"
              class="ca-product-page__size-picker"
              @click="$store.dispatch('quickshop/open', voyadoProduct)"
            >
              {{ $t('PICK_SIZE') }}
              <CaIcon
                class="ca-product-page__size-picker-arrow"
                name="chevron-right"
              />
            </button>
            <CaButton
              v-if="outOfStock && !hasSkuVariants"
              class="ca-product-page__buy-button"
              type="full-width"
              color="secondary"
              @clicked="notifyHandler(product.skus[0])"
            >
              {{ $t('NOTIFY_PANEL_BUTTON') }}
            </CaButton>
            <CaButton
              v-else
              class="ca-product-page__buy-button"
              type="full-width"
              color="tertiary"
              :loading="addToCartLoading"
              :disabled="outOfStock"
              @clicked="addToCartClick"
            >
              {{ buyButtonText }}
              <CaIcon name="shopping-bag" />
            </CaButton>
          </div>
          <CaVariantPicker
            v-if="hasVariants"
            class="ca-product-page__color-picker"
            :variants="baseVariants"
            :variants-data="variantPickerData"
            :title="$t('PICK_COLOR')"
            type="image"
            @replaceProduct="replaceProduct"
            @notify="notifyHandler"
          >
            <template v-slot:title>
              <p class="ca-product-page__color-picker-title">
                {{ $t('CHOSEN_COLOR') }}:
                <span class="ca-product-page__color-picker-current">
                  {{ baseVariantLabel }}
                </span>
              </p>
            </template>
          </CaVariantPicker>
          <div class="ca-product-page__payment">
            <CaAvardaMonthlyPayment
              v-if="$store.state.channel.currentMarket !== 'dk'"
              class="ca-product-page__split-payment"
              :price="product.unitPrice"
            />
            <CaLogoDisplay
              type="payment"
              class="ca-product-page__payment-logos"
            />
          </div>
          <CaProductAccordion
            class="ca-product-page__accordion"
            :product="product"
          />
        </div>
        <div
          v-else
          class="ca-product-page__main ca-product-page__main--skeleton"
        >
          <CaSkeleton
            width="20%"
            class="ca-price ca-product-page__price ca-product-page__price--skeleton"
          />
          <div class="ca-brand-and-name ca-product-page__brand-and-name">
            <div class="ca-brand-and-name__brand">
              <CaSkeleton width="30%" class="ca-brand-and-name__brand" />
            </div>
            <CaSkeleton width="50%" class="ca-brand-and-name__name" />
          </div>
          <div class="ca-product-page__buy-wrap">
            <CaSkeleton width="100%" height="52px" :radius="false" />
            <CaSkeleton
              class="ca-product-page__skeleton-button"
              width="100%"
              height="52px"
              :radius="false"
            />
          </div>
          <div class="ca-product-page__payment">
            <div
              class="ca-avarda-monthly-payment ca-product-page__split-payment"
            >
              <CaSkeleton width="50%" />
            </div>
          </div>
        </div>
      </section>
    </CaContainer>
    <section class="ca-product-page__widget-section">
      <CaWidgetArea
        v-if="product"
        class="ca-product-page__widget-area"
        family="Product"
        area-name="Product detail page"
        :filters="widgetAreaFilters"
      />
    </section>
    <section class="ca-product-page__voyado-recs">
      <CaContainer>
        <VoyadoRecommendations
          v-if="product"
          :product-key="product.articleNumber"
          :random-titles="3"
          @voyadoProductData="setVoyadoData"
        />
      </CaContainer>
    </section>
  </div>
</template>

<script>
/*
  Renders product page.

  @mixin MixProductPage - handles product page logic
  @mixin MixAddToCart - handles add to cart logic
  @mixin MixVariantHandler - handles variant logic

  events:
    - replaceProduct - replaces product with new one
    - notify - notifies user about product
    - changeSku - changes sku
    - changed - quantity changed
    - thresholdReached - quantity threshold reached
    - clicked - add to cart clicked

*/
import MixAddToCart from 'MixAddToCart';
import MixVariantHandler from 'MixVariantHandler';
import MixProductPage from 'MixProductPage';
import { VoyadoProductPage } from '@geins/ralph-module-voyado-elevate';
export default {
  name: 'ProductPage',
  mixins: [MixProductPage, MixAddToCart, MixVariantHandler, VoyadoProductPage],
  data: () => ({}),
  computed: {
    buyButtonText() {
      return this.$store.getters.viewport === 'phone'
        ? this.$t('ADD_TO_CART_SHORT')
        : this.$t('ADD_TO_CART');
    },
    lowestPrice() {
      const lowest = this.product?.priceLog.find(price => price.isLowest);
      return lowest?.sellingPriceIncVatFormatted;
    },
    mainModifiers() {
      return {
        'ca-product-page__main--header-hidden': this.$store.state.headerHidden,
        'ca-product-page__main--header-scrolled': !this.$store.getters
          .siteIsAtTop
      };
    },
    videoId() {
      return (
        this.product.parameterGroups
          .find(group => group.parameterGroupId === 1)
          ?.parameters.find(param => param.name === 'Video')?.value ?? ''
      );
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
    productImages() {
      if (!Array.isArray(this.product?.productImages)) {
        return [];
      }

      if (!this.prioritizeTag) {
        return this.product.productImages.map(x => x.fileName);
      }

      const imagesSortedOnTag = [...this.product.productImages].sort((a, b) => {
        const tagA = a.tags.includes(this.prioritizeTag) ? -1 : 1;
        const tagB = b.tags.includes(this.prioritizeTag) ? -1 : 1;

        return tagA - tagB;
      });

      return imagesSortedOnTag.map(x => x.fileName);
    }
  },
  methods: {
    scrollToGalleryVideo() {
      if (this.$refs.gallery) {
        this.$refs.gallery.scrollToVideo();
      }
    },
    notifyHandler(variant) {
      this.currentNotifyVariant = variant;
      this.$store.commit('quickshop/setProduct', this.voyadoProduct);
      this.$store.commit('quickshop/setNotifyVariant', variant);
      this.$nextTick(() => {
        this.$store.commit('contentpanel/open', {
          name: 'notify'
        });
      });
    }
  },
  meta: {
    pageType: 'Product'
  }
};
</script>

<style lang="scss">
@import './styles/pages/product-page';
</style>
