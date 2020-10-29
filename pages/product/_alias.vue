<template>
  <div class="ca-product-page">
    <CaProductMeta v-if="product !== undefined" :product="product" />
    <CaContainer>
      <div class="ca-product-page__section">
        <CaProductGallery
          v-if="product !== undefined"
          class="ca-product-page__gallery"
          :images="productImages"
          :alt="product.brand.name + ' ' + product.name"
        />
        <div v-if="product !== undefined" class="ca-product-page__main">
          <CaToggleFavorite :prod-id="product.productId" />
          <CaBrandAndName
            :brand="product.brand.name"
            :brand-alias="product.brand.alias"
            :name="product.name"
            name-tag="h1"
          />
          <CaPrice class="ca-product-page__price" :price="product.unitPrice" />
          <!-- eslint-disable vue/no-v-html -->
          <div
            class="ca-product-page__short-text"
            v-html="product.shortText"
          ></div>

          <p v-if="hasColorVariants" class="ca-product-page__variant-title">
            {{ $t('PICK_COLOR') }}
          </p>
          <CaColorPicker
            v-if="hasColorVariants"
            class="ca-product-page__variant-picker"
            :colors="colorVariants.values"
            :current-color="product.currentProductVariant.value"
            :aliases="colorProductAliases"
            @changed="replaceProduct"
          />
          <p v-if="hasSkuVariants" class="ca-product-page__variant-title">
            {{ $t('PICK_SIZE') }}
          </p>
          <CaSizePicker
            v-if="hasSkuVariants"
            class="ca-product-page__variant-picker"
            :sizes="skuVariants"
            :chosen-sku="chosenSku"
            @reset="resetSku"
            @changed="sizeChangeHandler"
          />
          <CaProductQuantity
            class="ca-product-page__quantity"
            :quantity="quantity"
            :max-quantity="currentStock"
            @changed="onQuantityChange"
          />
          <CaButton
            class="ca-product-page__buy-button"
            type="full-width"
            :loading="addToCartLoading"
            :disabled="!chosenSku.id"
            @clicked="addToCartClick"
            >{{ $t('ADD_TO_CART') }}</CaButton
          >
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
      </div>
      <CaWidgetArea
        class="ca-product-page__widget-area"
        family="Product"
        area-name="Product detail page"
      />
    </CaContainer>
  </div>
</template>

<script>
import CaContainer from 'CaContainer';
import CaProductGallery from 'CaProductGallery';
import CaButton from 'CaButton';
import CaIconAndText from 'CaIconAndText';
import CaProductMeta from 'CaProductMeta';
import CaWidgetArea from 'CaWidgetArea';
import CaBrandAndName from 'CaBrandAndName';
import CaPrice from 'CaPrice';
import CaToggleFavorite from 'CaToggleFavorite';
import CaProductQuantity from 'CaProductQuantity';
import CaColorPicker from 'CaColorPicker';
import CaSizePicker from 'CaSizePicker';

import MixAddToCart from 'MixAddToCart';
import MixVariantHandler from 'MixVariantHandler';
import MixProductPage from 'MixProductPage';

export default {
  name: 'ProductPage',
  components: {
    CaContainer,
    CaProductGallery,
    CaBrandAndName,
    CaPrice,
    CaButton,
    CaIconAndText,
    CaProductMeta,
    CaToggleFavorite,
    CaWidgetArea,
    CaProductQuantity,
    CaColorPicker,
    CaSizePicker
  },
  mixins: [MixProductPage, MixAddToCart, MixVariantHandler],
  data: () => ({}),
  computed: {},
  watch: {},
  methods: {}
};
</script>

<style lang="scss">
.ca-product-page {
  &__section {
    @include bp(laptop) {
      display: flex;
      justify-content: space-between;
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
      width: 49.6%;
    }
  }
  &__price {
    margin: $px4 0 $px8;
  }
  &__short-text {
    margin-bottom: $px16;
  }
  &__variant-title {
    text-transform: uppercase;
    font-size: $font-size-m;
    margin-bottom: $px8;
    font-weight: $font-weight-bold;
  }
  &__variant-picker {
    margin-bottom: $default-spacing;
  }
  &__quantity {
    margin-bottom: $px16;
  }
  &__buy-button {
    margin-bottom: $px20;
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
    padding: $px16 0 $px40;
  }
  &__usp {
    padding: 0 $px4;
    text-align: center;
    .ca-icon {
      margin-bottom: $px4;
    }
  }
}
</style>
