<template>
  <div class="ca-list-page ca-list-page--category">
    <CaContainer v-if="currentCategory !== null">
      <CaListTop
        :title="currentCategory.name"
        :description="currentCategory.description"
        :sub-categories="subLevelCategories"
      />
      <CaListSettings :active-products="currentCategory.activeProducts" />
      <div v-if="skip !== 0" class="ca-product-list__pagination">
        <div class="ca-product-list__showing">
          {{
            $t('PAGINATION_SHOWING', {
              sum: showing,
              total: currentCategory.activeProducts
            })
          }}
          {{ $tc('PRODUCT', currentCategory.activeProducts) }}
        </div>
        <CaButton class="ca-product-list__next" @clicked="loadPrev">
          {{ $t('LOAD_PREVIOUS') }}
        </CaButton>
      </div>
      <ul v-if="products !== undefined" class="ca-product-list">
        <CaProductCard
          v-for="(product, index) in activeProducts"
          :key="index"
          :product="product"
        >
        </CaProductCard>
      </ul>
      <div class="ca-product-list__pagination">
        <div class="ca-product-list__showing">
          {{
            $t('PAGINATION_SHOWING', {
              sum: showing,
              total: currentCategory.activeProducts
            })
          }}
          {{ $tc('PRODUCT', currentCategory.activeProducts) }}
        </div>
        <CaButton
          class="ca-product-list__next"
          :disabled="allProductsLoaded"
          @clicked="loadMore"
        >
          {{ $t('LOAD_MORE') }}
        </CaButton>
      </div>
    </CaContainer>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { CaContainer, CaButton } from '@ralph/ralph-ui';
import CaProductCard from '@/components/organisms/CaProductCard/CaProductCard';
import CaListTop from '@/components/organisms/CaListTop/CaListTop';
import CaListSettings from '@/components/organisms/CaListSettings/CaListSettings';

export default {
  name: 'ProductPage',
  components: {
    CaContainer,
    CaButton,
    CaProductCard,
    CaListTop,
    CaListSettings
  },
  apollo: {
    products: {
      query: gql`
        query products(
          $skip: Int!
          $take: Int!
          $langCode: String!
          $categoryAlias: String!
        ) {
          products(
            skip: $skip
            take: $take
            langCode: $langCode
            categoryAlias: $categoryAlias
          ) {
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
          langCode: this.$i18n.locale,
          categoryAlias: this.$route.params.category
        };
      }
    },
    categories: {
      query: gql`
        query categories($langCode: String!) {
          categories(langCode: $langCode) {
            alias
            name
            description
            categoryId
            parentCategoryId
            activeProducts
          }
        }
      `,
      variables() {
        return {
          langCode: this.$i18n.locale
        };
      }
    }
  },
  data() {
    return {
      skip: 0,
      take: 15,
      pageSize: 15
    };
  },
  computed: {
    activeProducts() {
      return this.products
        ? this.products.filter(item => item.active === true && item.name !== '')
        : [];
    },
    currentCategory() {
      return this.categories
        ? this.categories.filter(
            item => item.alias === this.$route.params.category
          )[0]
        : null;
    },
    subLevelCategories() {
      return this.categories
        ? this.categories.filter(
            item => item.parentCategoryId === this.currentCategory.categoryId
          )
        : [];
    },
    currentPage() {
      return this.$route.query.page || 1;
    },
    allProductsLoaded() {
      return (
        this.take >= this.currentCategory.activeProducts ||
        this.currentPage * this.pageSize >= this.currentCategory.activeProducts
      );
    },
    showing() {
      return this.skip + 1 + ' - ' + (this.skip + this.activeProducts.length);
    }
  },
  mounted() {
    if (this.$route.query.page) {
      this.skip = (this.$route.query.page - 1) * this.pageSize;
    }
  },
  methods: {
    loadMore() {
      this.take += this.pageSize;
      this.$router.push({
        path: this.$route.params.category,
        query: { page: this.currentPage + 1 }
      });
    },
    loadPrev() {
      this.take += this.pageSize;
      this.skip -= this.pageSize;
      this.$router.push({
        path: this.$route.params.category,
        query: { page: this.currentPage - 1 }
      });
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
    flex-direction: column;
    align-items: center;
  }
  &__showing {
    margin-bottom: $px12;
  }
}
</style>
