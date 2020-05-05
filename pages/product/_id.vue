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
            :name="getCurrentLang(product.names)"
            name-tag="h1"
          />
          <CaPrice
            class="ca-product-page__price"
            :selling-price="price.selling"
            :regular-price="price.regular"
            :is-sale="price.sale"
          />
          <p class="ca-product-page__short-text">
            {{ getCurrentLang(product.shortTexts) }}
          </p>
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
        query product($id: ID!) {
          product(id: $id) {
            productId
            names {
              languageCode
              content
            }
            brandName
            categories {
              categoryId
              names {
                languageCode
                content
              }
            }
            prices {
              currency
            }
            shortTexts {
              languageCode
              content
            }
            variants {
              groupId
              label
              productId
              value
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },
  data() {
    return {
      id: 1212,
      artNo: 2525,
      images: [
        'product-image.png',
        'product-image.png',
        'product-image.png',
        'product-image.png',
        'product-image.png'
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
      parameters: []
    };
  },
  computed: {
    productImages() {
      return this.images.map(item => require('~/assets/placeholders/' + item));
    },
    productInfo() {
      return this.product;
    }
  },
  methods: {
    getCurrentLang(localizedArray) {
      const result = localizedArray.filter(
        item =>
          item.languageCode === this.$i18n.locale ||
          item.languageCode === this.$i18n.fallbackLocale
      );
      return result[0].content;
    },
    addToCart() {
      // do sometinh
    }
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
