<template>
  <div class="ca-product-page">
    <CaProductMeta v-if="product !== undefined" :product="product" />
    <CaContainer>
      <div class="ca-product-page__section">
        <CaProductGallery
          class="ca-product-page__gallery"
          :images="productImages"
        />
        <div v-if="product !== undefined" class="ca-product-page__main">
          <CaToggleFavorite :prod-id="product.productId" />
          <CaBrandAndName
            :brand="product.brandName"
            :name="product.name"
            name-tag="h1"
          />
          <CaPrice class="ca-product-page__price" :price="product.price" />
          <!-- eslint-disable vue/no-v-html -->
          <div
            class="ca-product-page__short-text"
            v-html="product.shortText"
          ></div>
          <!-- <select v-model="chosenItemID" class="mar-bot-20">
            <option
              v-for="(item, index) in productItems"
              :key="index"
              :value="item.itemId"
            >
              {{ item.label }}
            </option>
          </select> -->
          <CaButton
            class="ca-product-page__buy-button"
            type="full-width"
            @clicked="addToCart"
            >{{ $t('ADD_TO_CART') }}</CaButton
          >
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
    </CaContainer>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import {
  CaContainer,
  CaProductGallery,
  CaButton,
  CaIconAndText,
  CaProductMeta
} from '@ralph/ralph-ui';
import CaBrandAndName from '@/components/atoms/CaBrandAndName/CaBrandAndName';
import CaPrice from '@/components/atoms/CaPrice/CaPrice';
import CaToggleFavorite from '@/components/molecules/CaToggleFavorite/CaToggleFavorite';

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
    CaToggleFavorite
  },
  apollo: {
    product: {
      query: gql`
        query product($alias: String!, $langCode: String!) {
          product(alias: $alias, langCode: $langCode) {
            productId
            name
            brandName
            images
            categories {
              categoryId
              name
            }
            price {
              isDiscounted
              regularPriceIncVat
              sellingPriceIncVat
              regularPriceExVat
              sellingPriceExVat
            }
            shortText
          }
        }
      `,
      variables() {
        return {
          alias: this.$route.params.alias,
          langCode: this.$i18n.locale
        };
      },
      error(error) {
        this.error = error.message;
      }
    }
  },
  data() {
    return {
      id: 1212,
      artNo: 2525,
      chosenItemID: 12345,
      images: [
        'product-image-square.png',
        'product-image-square.png',
        'product-image-square.png',
        'product-image-square.png',
        'product-image-square.png'
      ],
      price: {
        sale: false,
        selling: '299 kr',
        regular: '349 kr'
      },
      campaigns: ['Campaign name'],
      userFeedback: [
        {
          name: 'User name',
          grade: 4,
          message: 'This is awesome!',
          answer: 'Thanks, user!'
        },
        {
          name: 'Other user name',
          grade: 3,
          message: 'This is mediocre!',
          answer: ''
        }
      ],
      sizes: [
        { name: 'XS', stock: 5 },
        { name: 'S', stock: 0 },
        { name: 'M', stock: 5 },
        { name: 'L', stock: 10 },
        { name: 'XL', stock: 30 }
      ],
      infoShort: '',
      infoLong: '',
      infoOther: '',
      parameters: [],
      attributes: [
        {
          id: 11,
          label: 'Color',
          type: 'product',
          values: [
            {
              id: 110032,
              label: 'Gul',
              hex: '#fc0',
              url: '/110032'
            },
            {
              id: 110033,
              label: 'Röd',
              hex: '#e8001c',
              url: '/110033'
            }
          ]
        },
        {
          id: 22,
          label: 'Size',
          type: 'item',
          values: [
            {
              id: 'S',
              label: 'S',
              itemId: 12345
            },
            {
              id: 'M',
              label: 'M',
              itemId: 11345
            },
            {
              id: 'L',
              label: 'L',
              itemId: 22345
            }
          ]
        }
      ],
      variants: [
        {
          variants: [{ 22: 'S' }],
          productId: 110032,
          stock: {
            inStock: 10,
            oversellable: 0
          }
        },
        {
          variant: [{ 22: 'M' }],
          productId: 110032,
          stock: {
            inStock: 10,
            oversellable: 0
          }
        },
        {
          variant: [{ 22: 'L' }],
          productId: 110032,
          stock: {
            inStock: 15,
            oversellable: 0
          }
        },
        {
          variant: [{ 22: 'S' }],
          productId: 110033,
          stock: {
            inStock: 20,
            oversellable: 0
          }
        },
        {
          variant: [{ 22: 'M' }],
          productId: 110033,
          stock: {
            inStock: 0,
            oversellable: 5
          }
        },
        {
          variant: [{ 22: 'L' }],
          productId: 110033,
          stock: {
            inStock: 0,
            oversellable: 0
          }
        }
      ],
      error: null
    };
  },
  computed: {
    productImages() {
      return this.product && this.product.images && this.product.images.length
        ? this.product.images
        : [];
    },
    productItems() {
      return this.attributes.filter(item => item.type === 'item')[0].values;
    }
  },
  methods: {
    // getCurrentLang(localizedArray) {
    //   const result = localizedArray.filter(
    //     item =>
    //       item.languageCode === this.$i18n.locale ||
    //       item.languageCode === this.$i18n.fallbackLocale
    //   );
    //   return result[0].content;
    // },
    addToCart() {
      // do sometinh
    }
    // getImageUrl(images, size) {
    //   return images.filter(item => item.size === size)[0].url;
    // }
  }
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
  &__buy-button {
    margin-bottom: $px20;
  }
  &__usps {
    display: flex;
    justify-content: space-between;
    border-top: $border-light;
    padding: $px16 0;
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
