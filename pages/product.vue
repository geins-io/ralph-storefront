<template>
  <div class="ca-product-page">
    <CaContainer>
      <div class="ca-product-page__section">
        <CaProductGallery :images="productImages" />
        <div v-if="product !== undefined" class="ca-product-page__main">
          <CaIconButton
            icon-name="heart"
            @clicked="$store.commit('toggleFavorite', product.productId)"
          />
          <CaBrandAndName
            :brand="product.brandName"
            :name="getCurrentLang(product.names)"
            name-tag="h1"
          />
          <CaPrice
            :selling-price="price.selling"
            :regular-price="price.regular"
            :is-sale="price.sale"
          />
          <CaButton type="full-width" @clicked="addToCart"
            >Add to cart</CaButton
          >
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
  CaIconButton
} from '@ralph/ralph-ui';
import CaBrandAndName from '@/components/atoms/CaBrandAndName/CaBrandAndName';
import CaPrice from '@/components/atoms/CaPrice/CaPrice';

export default {
  name: 'ProductPage',
  components: {
    CaContainer,
    CaProductGallery,
    CaBrandAndName,
    CaPrice,
    CaButton,
    CaIconButton
  },
  apollo: {
    product: gql`
      {
        product(id: 110032) {
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
          variants {
            groupId
            label
            productId
            value
          }
        }
      }
    `
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
}
</style>
