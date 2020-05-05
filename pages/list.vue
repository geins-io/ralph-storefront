<template>
  <div class="ca-list-page">
    <CaContainer>
      <h1 class="site-title">ralph / list page</h1>
      <p class="site-preamble">
        {{
          activeProducts.length +
            ' ' +
            $tc('PRODUCT', activeProducts.length).toLowerCase()
        }}
      </p>
      <ul v-if="products !== undefined" class="ca-product-list">
        <li
          v-for="(product, index) in activeProducts"
          :key="index"
          class="ca-product-item"
        >
          <div class="ca-product-item__image-wrap">
            <NuxtLink
              class="ca-product-item__image-wrap"
              :to="'/product/' + product.productId"
            >
              <img
                class="ca-product-item__image"
                :src="require('~/assets/placeholders/product-image.png')"
              />
            </NuxtLink>
            <CaToggleFavorite
              class="ca-product-item__favorite"
              :prod-id="product.productId"
            />
          </div>
          <div class="ca-product-item__info">
            <NuxtLink :to="'/product/' + product.productId">
              <CaBrandAndName
                :brand="product.brandName"
                :name="getCurrentLang(product.names)"
                name-tag="h2"
              />
              <CaPrice
                class="ca-product-item__price"
                :selling-price="price.selling"
                :regular-price="price.regular"
                :is-sale="price.sale"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>
    </CaContainer>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { CaContainer } from '@ralph/ralph-ui';
import CaBrandAndName from '@/components/atoms/CaBrandAndName/CaBrandAndName';
import CaPrice from '@/components/atoms/CaPrice/CaPrice';
import CaToggleFavorite from '@/components/molecules/CaToggleFavorite/CaToggleFavorite';

export default {
  name: 'ProductPage',
  components: {
    CaContainer,
    CaBrandAndName,
    CaPrice,
    CaToggleFavorite
  },
  apollo: {
    products: gql`
      {
        products {
          active
          brandName
          names {
            content
            languageCode
          }
          productId
        }
      }
    `
  },
  data() {
    return {
      id: 1212,
      artNo: 2525,
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
      ]
    };
  },
  computed: {
    activeProducts() {
      return this.products
        ? this.products.filter(
            item =>
              item.active === true && this.getCurrentLang(item.names) !== ''
          )
        : [];
    }
  },
  methods: {
    getCurrentLang(localizedArray) {
      const result = localizedArray.filter(
        item =>
          item.languageCode === this.$i18n.locale ||
          item.languageCode === this.$i18n.fallbackLocale
      );
      return result.length ? result[0].content : '';
    },
    addToCart() {
      // do sometinh
    }
  }
};
</script>

<style lang="scss">
.site-title {
  font-size: $font-size-xxl;
  text-align: center;
  font-weight: $font-weight-bold;
}
.ca-list-page {
}
.ca-product-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.ca-product-item {
  position: relative;
  width: calc(50% - (#{$default-spacing}/ 2));
  &:nth-child(1n + 3) {
    margin-top: $default-spacing;
  }
  @include bp(tablet) {
    width: calc(33.33333% - (#{$default-spacing}));
    &:nth-child(1n + 3) {
      margin-top: 0;
    }
    &:nth-child(1n + 4) {
      margin-top: $default-spacing;
    }
  }
  @include bp(laptop) {
    &:nth-child(1n + 4) {
      margin-top: 0;
    }
    &:nth-child(1n + 6) {
      margin-top: $default-spacing;
    }
    width: calc(20% - (#{$default-spacing}));
  }
  &__image-wrap {
    line-height: 0;
    position: relative;
  }
  &__info {
    padding-top: $px12;
    display: block;
  }
  &__favorite {
    width: 36px;
    height: 36px;
    top: auto;
    right: $px12;
    bottom: $px12;
  }
  &__price {
    margin-top: $px4;
  }
}
</style>
