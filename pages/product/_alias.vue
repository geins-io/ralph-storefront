<template>
  <div class="ca-product-page">
    <CaProductMeta v-if="product !== undefined" :product="product" />
    <CaContainer>
      <CaBreadcrumbs
        v-if="product !== undefined"
        :current="breadcrumbsCurrent"
        :product-name="product.name"
      />
      <section class="ca-product-page__section">
        <CaProductGallery
          v-if="product !== undefined"
          class="ca-product-page__gallery"
          :images="productImages"
          :alt="product.brand.name + ' ' + product.name"
        />
        <div v-else class="ca-product-page__gallery ca-product-gallery">
          <div class="ca-product-gallery__nav only-computer">
            <div class="ca-product-gallery__nav-slide">
              <CaSkeleton
                class="ca-product-gallery__nav-image"
                :ratio="$config.productImageRatio"
                :radius="false"
              />
            </div>
            <div class="ca-product-gallery__nav-slide">
              <CaSkeleton
                class="ca-product-gallery__nav-image"
                :ratio="$config.productImageRatio"
                :radius="false"
              />
            </div>
            <div class="ca-product-gallery__nav-slide">
              <CaSkeleton
                class="ca-product-gallery__nav-image"
                :ratio="$config.productImageRatio"
                :radius="false"
              />
            </div>
          </div>
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
        <div v-if="product !== undefined" class="ca-product-page__main">
          <CaToggleFavorite :prod-id="product.productId" />
          <CaBrandAndName
            :brand="product.brand.name"
            :brand-alias="product.brand.alias"
            :name="product.name"
            name-tag="h1"
          />
          <CaPrice class="ca-product-page__price" :price="product.unitPrice" />

          <CaHtml
            v-if="product !== undefined && product.texts.text1"
            class="ca-product-page__product-summary"
            :content="product.texts.text1"
          />
          <CaVariantPicker
            v-if="hasVariants"
            :variants="baseVariants"
            :variants-data="variantPickerData"
            :title="
              baseVariantType === 'Color' ? $t('PICK_COLOR') : 'Välj lådstorlek'
            "
            :type="baseVariantType === 'Color' ? 'color' : 'panel'"
            @replaceProduct="replaceProduct"
          />

          <CaVariantPicker
            v-if="hasMultipleDimensions"
            :variants="secondDimensionVariants"
            :variants-data="variantPickerData"
            title="Välj lådstorlek"
            type="panel"
            @replaceProduct="replaceProduct"
          />

          <CaVariantPicker
            v-if="hasSkuVariants"
            :variants="skuVariants"
            :variants-data="variantPickerData"
            title="Med logga"
            type="display"
            @changeSku="sizeChangeHandler"
          />

          <CaProductQuantity
            class="ca-product-page__quantity"
            :quantity="quantity"
            :max-quantity="currentStock"
            :threshold="stockThreshold"
            @changed="onQuantityChange"
            @thresholdReached="quantityThresholdHandler"
          />
          <CaButton
            class="ca-product-page__buy-button"
            type="full-width"
            :loading="addToCartLoading"
            :disabled="stockStatus === 'out-of-stock'"
            @clicked="addToCartClick"
          >
            {{ $t('ADD_TO_CART') }}
          </CaButton>
          <div class="ca-product-page__actions">
            <CaIconAndText
              class="ca-product-page__stock-status"
              icon-name="box"
            >
              {{ stockStatusText }}
            </CaIconAndText>
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
          v-if="product !== undefined"
          class="ca-product-page__accordion"
          :product="product"
        />
        <div class="ca-product-page__specifications-box only-computer">
          <h2 class="ca-product-page__specifications-title">
            {{ $t('PRODUCT_SPECIFICATION') }}
          </h2>
          <CaSpecifications
            v-if="product !== undefined && product.parameterGroups !== null"
            :specification-groups="product.parameterGroups"
          />
          <p v-else>
            {{ $t('NO_PRODUCT_SPECIFICATION') }}
          </p>
        </div>
      </section>
    </CaContainer>
    <section class="ca-product-page__widget-section">
      <CaWidgetArea
        class="ca-product-page__widget-area"
        family="Product"
        area-name="Product detail page"
        :filters="widgetAreaFilters"
      />
    </section>
  </div>
</template>

<script>
import MixAddToCart from 'MixAddToCart';
import MixVariantHandler from 'MixVariantHandler';
import MixProductPage from 'MixProductPage';

export default {
  name: 'ProductPage',
  mixins: [MixProductPage, MixAddToCart, MixVariantHandler],
  data: () => ({}),
  computed: {},
  watch: {},
  methods: {}
};
</script>

<style lang="scss">
$column-width: 48.2%;
.ca-product-page {
  &__section {
    margin-bottom: $px20;
    @include bp(laptop) {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: $px56;
    }
  }
  &__main {
    position: relative;
    max-width: 500px;
    margin: $px16 auto 0;
    @include bp(laptop) {
      width: 40%;
      margin: $px32 auto 0;
    }
  }
  &__gallery {
    @include bp(laptop) {
      display: flex;
      justify-content: space-between;
      width: $column-width;
      margin-right: $px48;
    }
  }
  &__skeleton-main-slide {
    @include bp(tablet-down) {
      width: 69.5%;
      margin: 0 auto;
    }
  }
  &__price {
    margin: $px4 0 $px8;
  }
  &__product-summary {
    margin-bottom: $px16;
  }
  &__variant-picker {
    margin-bottom: $default-spacing;
  }
  &__quantity {
    margin-bottom: $px16;
  }
  &__skeleton-button {
    .ca-skeleton + & {
      margin-top: $px32;
    }
  }
  &__buy-button {
    margin-bottom: $px20;
    padding: 0.9em 2.15em;
  }
  &__stock-status {
    font-size: $font-size-m;
    font-weight: $font-weight-bold;
  }
  &__actions {
    margin-bottom: $px24;
  }
  &__usps {
    display: flex;
    justify-content: space-between;
    border-top: $border-light;
    padding: $px16 0 0;
  }
  &__usp {
    padding: 0 $px4;
    text-align: center;
    .ca-icon {
      margin-bottom: $px4;
    }
  }
  &__accordion {
    margin: 0 -#{$default-spacing/2} $default-spacing;
    @include bp(laptop) {
      margin: 0;
      width: $column-width;
    }
  }
  &__specifications-box {
    @include bp(laptop) {
      width: $column-width;
      background: $c-lightest-gray;
      padding: 0 $px24 $px16;
    }
  }
  &__specifications-title {
    font-size: $font-size-l;
    font-weight: $font-weight-bold;
    padding: 1rem 0;
  }
}
</style>
