<template>
  <div class="ca-product-page">
    <CaProductMeta v-if="product !== undefined" :product="product" />
    <CaContainer>
      <section class="ca-product-page__section">
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
            v-if="product !== undefined && product.texts.text1"
            class="ca-product-page__product-summary"
            v-html="product.texts.text1"
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
      </section>
      <section class="ca-product-page__section">
        <div class="ca-product-page__accordions">
          <CaAccordionItem
            class="ca-product-page__accordion"
            :open-on-init="true"
          >
            <template v-slot:toggle>
              {{ $t('PRODUCT_DESCRIPTION') }}
            </template>
            <!-- eslint-disable vue/no-v-html -->
            <div
              v-if="product !== undefined && product.texts.text2"
              class="ca-product-page__accordion-content ca-product-page__product-description"
              v-html="product.texts.text2"
            ></div>
            <div
              v-else
              class="ca-product-page__accordion-content ca-product-page__product-description"
            >
              {{ $t('NO_PRODUCT_DESCRIPTION') }}
            </div>
          </CaAccordionItem>
          <CaAccordionItem
            v-if="product !== undefined && product.parameterGroups !== null"
            class="ca-product-page__accordion only-mobile"
          >
            <template v-slot:toggle>
              {{ $t('PRODUCT_SPECIFICATION') }}
            </template>
            <div
              class="ca-product-page__accordion-content ca-product-page__specifications"
            >
              <CaSpecifications
                :specification-groups="product.parameterGroups"
              />
            </div>
          </CaAccordionItem>
          <CaAccordionItem
            v-if="product !== undefined && product.texts.text3"
            class="ca-product-page__accordion"
          >
            <template v-slot:toggle>
              Ingredienser
            </template>
            <!-- eslint-disable vue/no-v-html -->
            <div
              class="ca-product-page__accordion-content ca-product-page__tech-description"
              v-html="product.texts.text3"
            ></div>
          </CaAccordionItem>
        </div>
        <div class="ca-product-page__specifications-box only-desktop">
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
import CaAccordionItem from 'CaAccordionItem';
import CaSpecifications from 'CaSpecifications';

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
    CaSizePicker,
    CaAccordionItem,
    CaSpecifications
  },
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
  &__price {
    margin: $px4 0 $px8;
  }
  &__product-summary {
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
    padding: $px16 0 0;
  }
  &__usp {
    padding: 0 $px4;
    text-align: center;
    .ca-icon {
      margin-bottom: $px4;
    }
  }

  &__accordions {
    border-top: $border-light;
    margin: 0 -#{$default-spacing/2} $default-spacing;
    @include bp(laptop) {
      margin: 0;
      width: $column-width;
      border-left: $border-light;
      border-right: $border-light;
      .ca-accordion-item__toggle {
        font-size: $font-size-l;
      }
    }
    @include bp(tablet-down) {
      .ca-accordion-item__toggle {
        padding: 1rem ($default-spacing / 2);
      }
    }
  }

  &__accordion-content {
    padding: $default-spacing / 2;
    @include bp(laptop) {
      padding: $px16;
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
