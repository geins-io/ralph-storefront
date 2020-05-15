<template>
  <div class="ca-list-page">
    <CaContainer>
      <h1 class="site-title">ralph / list page</h1>

      <div class="ca-product-list__pagination">
        <CaButton
          class="ca-product-list__prev"
          :disabled="skip === 0"
          @clicked="prevPage"
        >
          {{ $t('PREVIOUS') }}
        </CaButton>
        <CaButton class="ca-product-list__next" @clicked="nextPage">
          {{ $t('NEXT') }}
        </CaButton>
      </div>
      <ul v-if="products !== undefined" class="ca-product-list">
        <li
          v-for="(product, index) in activeProducts"
          :key="index"
          class="ca-product-item"
        >
          <div class="ca-product-item__image-wrap">
            <NuxtLink
              class="ca-product-item__image-wrap"
              :to="'/product/' + product.alias"
            >
              <CaImage
                v-if="product.images !== null"
                class="ca-product-item__image"
                type="product"
                size="300f300"
                :filename="product.images[0]"
                :placeholder="
                  require('~/assets/placeholders/product-image-square.png')
                "
              />
              <img
                v-else
                class="ca-product-item__image"
                :src="require('~/assets/placeholders/product-image-square.png')"
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
                :name="product.name"
                name-tag="h2"
              />
              <CaPrice class="ca-product-item__price" :price="product.price" />
            </NuxtLink>
          </div>
        </li>
      </ul>
      <div class="ca-product-list__pagination">
        <CaButton
          class="ca-product-list__prev"
          :disabled="skip === 0"
          @clicked="prevPage"
        >
          {{ $t('PREVIOUS') }}
        </CaButton>
        <CaButton class="ca-product-list__next" @clicked="nextPage">
          {{ $t('NEXT') }}
        </CaButton>
      </div>
    </CaContainer>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { CaContainer, CaButton, CaImage } from '@ralph/ralph-ui';
import CaBrandAndName from '@/components/atoms/CaBrandAndName/CaBrandAndName';
import CaPrice from '@/components/atoms/CaPrice/CaPrice';
import CaToggleFavorite from '@/components/molecules/CaToggleFavorite/CaToggleFavorite';

export default {
  name: 'ProductPage',
  components: {
    CaContainer,
    CaBrandAndName,
    CaPrice,
    CaToggleFavorite,
    CaButton,
    CaImage
  },
  apollo: {
    products: {
      query: gql`
        query products($skip: Int!, $take: Int!, $langCode: String!) {
          products(skip: $skip, take: $take, langCode: $langCode) {
            active
            brandName
            name
            productId
            alias
            price {
              isDiscounted
              regularPriceIncVat
              sellingPriceIncVat
              regularPriceExVat
              sellingPriceExVat
            }
            images
          }
        }
      `,
      variables() {
        return {
          skip: this.skip,
          take: this.take,
          langCode: this.$i18n.locale
        };
      }
    }
  },
  data() {
    return {
      skip: 0,
      take: 10
    };
  },
  computed: {
    activeProducts() {
      return this.products
        ? this.products
            .filter(item => item.active === true && item.name !== '')
            .slice(0, 60)
        : [];
    }
  },
  methods: {
    nextPage() {
      this.skip += this.take;
    },
    prevPage() {
      this.skip -= this.take;
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
.site-preamble {
  max-width: 450px;
  margin: $px20 auto;
  font-size: $font-size-l;
  text-align: center;
}
.ca-product-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &__pagination {
    padding: $px32 0;
    display: flex;
    justify-content: space-between;
  }
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
  &__price {
    margin-top: $px4;
  }

  .ca-toggle-favorite {
    width: 36px;
    height: 36px;
    top: auto;
    right: $px12;
    bottom: $px12;
  }
}
</style>
