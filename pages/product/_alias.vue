<template>
  <div class="ca-product-page">
    <CaProductMeta v-if="product" :product="product" />
    <CaContainer>
      <CaBreadcrumbs
        v-if="product"
        :current="breadcrumbsCurrent"
        :product-name="product.name"
      />
      <CaSkeleton v-else class="ca-breadcrumbs" width="30%" />
      <section class="ca-product-page__section">
        <CaProductGallery
          v-if="product"
          class="ca-product-page__gallery"
          :images="productImages"
          :alt="product.brand.name + ' ' + product.name"
          :preloaded-image="preloadedImage"
          gallery-mode="plain"
          main-image-sizes="(min-width: 1920px) 815px, (min-width: 1024px) 42vw, (min-width: 768px) 600px, 100vw"
          thumbnail-sizes="(min-width: 1920px) 400px, 21vw"
          thumbnail-mode="grid"
        />
        <div v-else class="ca-product-page__gallery ca-product-gallery">
          <div class="ca-product-gallery__slider">
            <div
              class="ca-product-gallery__slide ca-product-page__skeleton-main-slide"
            >
              <CaSkeleton
                class="ca-product-gallery__image"
                :ratio="$config.productImageRatio"
                :radius="false"
              />
            </div>
          </div>
        </div>
        <div v-if="product" class="ca-product-page__main">
          <LazyCaToggleFavorite
            v-if="prodAlias"
            :prod-alias="prodAlias"
            :prod-id="product.productId"
          />
          <CaBrandAndName
            :brand="product.brand.name"
            :brand-alias="product.brand.canonicalUrl"
            :name="product.name"
            name-tag="h1"
          />
          <CaPrice class="ca-product-page__price" :price="product.unitPrice" />

          <LazyCaHtml
            v-if="product && product.texts.text1"
            class="ca-product-page__product-summary"
            :content="product.texts.text1"
          />
          <LazyCaCampaigns
            v-if="product.discountCampaigns && product.discountCampaigns.length"
            class="ca-product-page__campaigns"
            :campaigns="product.discountCampaigns"
          />
          <LazyCaVariantPicker
            v-if="hasVariants"
            :variants="baseVariants"
            :variants-data="variantPickerData"
            :title="
              baseVariantType === 'Color'
                ? $t('PICK_COLOR')
                : $t('PICK_VARIANT')
            "
            :type="baseVariantType === 'Color' ? 'color' : 'panel'"
            @replaceProduct="replaceProduct"
            @notify="notifyHandler"
          />

          <LazyCaVariantPicker
            v-if="hasMultipleDimensions"
            :variants="secondDimensionVariants"
            :variants-data="variantPickerData"
            :title="$t('PICK_VARIANT')"
            type="panel"
            @replaceProduct="replaceProduct"
            @notify="notifyHandler"
          />

          <LazyCaVariantPicker
            v-if="hasSkuVariants"
            :variants="skuVariants"
            :variants-data="variantPickerData"
            :title="$t('PICK_SKU')"
            type="display"
            @changeSku="skuChangeHandler"
            @notify="notifyHandler"
          />

          <LazyCaNotifyPanel
            :product="product"
            :variant="currentNotifyVariant"
          />

          <CaProductQuantity
            class="ca-product-page__quantity"
            :quantity="quantity"
            :max-quantity="currentStock.totalStock"
            :threshold="stockThreshold"
            @changed="onQuantityChange"
            @thresholdReached="quantityThresholdHandler"
          />

          <CaButton
            v-if="outOfStock && !hasSkuVariants"
            class="ca-product-page__buy-button"
            type="full-width"
            color="secondary"
            @clicked="notifyHandler(skuVariants[0])"
          >
            {{ $t('NOTIFY_PANEL_BUTTON') }}
          </CaButton>
          <CaButton
            v-else
            class="ca-product-page__buy-button"
            type="full-width"
            :loading="addToCartLoading"
            :disabled="outOfStock"
            @clicked="addToCartClick"
          >
            {{ $t('ADD_TO_CART') }}
          </CaButton>
          <div class="ca-product-page__actions">
            <CaStockDisplay
              class="ca-product-page__stock-display"
              :stock="currentStock"
              :product-quantity="quantity"
              :show-delivery-time="true"
            />
          </div>
          <div class="ca-product-page__usps">
            <CaIconAndText
              class="ca-product-page__usp"
              icon-name="check-circle"
              icon-position="top"
            >
              {{ $t('USP_1') }}
            </CaIconAndText>
            <CaIconAndText
              class="ca-product-page__usp"
              icon-name="check-circle"
              icon-position="top"
            >
              {{ $t('USP_2') }}
            </CaIconAndText>
            <CaIconAndText
              class="ca-product-page__usp"
              icon-name="check-circle"
              icon-position="top"
            >
              {{ $t('USP_3') }}
            </CaIconAndText>
          </div>
          <div
            v-if="$config.productShowRelated && relatedProductsRelated.length"
            class="ca-product-page__related"
          >
            <h3 class="ca-product-page__related-title">
              {{ $t('RELATED_PRODUCTS') }}
            </h3>
            <LazyCaQuickAddProducts
              class="ca-product-page__related-products"
              :products="relatedProductsRelated"
            />
          </div>
        </div>
        <div
          v-else
          class="ca-product-page__main ca-product-page__main--skeleton"
        >
          <CaSkeleton width="30%" />
          <CaSkeleton width="50%" />
          <CaSkeleton width="20%" />
          <CaSkeleton width="70%" />
          <CaSkeleton
            class="ca-product-page__skeleton-button"
            width="100%"
            height="50px"
          />
        </div>
      </section>
      <section class="ca-product-page__section">
        <CaProductAccordion
          v-if="product"
          class="ca-product-page__accordion"
          :product="product"
        />
        <div class="ca-product-page__specifications-box only-computer">
          <h2 class="ca-product-page__specifications-title">
            {{ $t('PRODUCT_SPECIFICATION') }}
          </h2>
          <LazyCaSpecifications
            v-if="product && product.parameterGroups !== null"
            :specification-groups="product.parameterGroups"
          />
          <p v-else>
            {{ $t('NO_PRODUCT_SPECIFICATION') }}
          </p>
        </div>
      </section>
      <section
        v-if="$config.showProductReviewSection"
        class="ca-product-page__section-review"
      >
        <client-only>
          <LazyCaReviewsList :product-alias="prodAlias" />
          <LazyCaReviewForm :product-alias="prodAlias" />
        </client-only>
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
  </div>
</template>

<script>
/*
  Renders product page.

  @mixin MixProductPage - handles product page logic

*/

import MixProductPage from 'MixProductPage';

export default {
  name: 'ProductPage',
  mixins: [MixProductPage],
  data: () => ({}),
  computed: {},
  methods: {},
  meta: {
    pageType: 'Product Page',
  },
};
</script>

<style lang="scss">
@import './styles/pages/product-page';
</style>
