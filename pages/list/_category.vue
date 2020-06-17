<template>
  <div class="ca-list-page ca-list-page--category">
    <CaContainer v-if="category !== null">
      <CaListTop
        :title="category.name"
        :description="category.primaryDescription"
        :sub-categories="category.subCategories"
      />

      <CaImage
        v-if="category.primaryImage"
        class="ca-list-page__image"
        size="1280w"
        type="categoryheader"
        :filename="category.primaryImage"
        :placeholder="category.primaryImage"
      />

      <CaListFilters
        :filters="filters"
        :selection="selection"
        @selectionchange="filterChangeHandler($event)"
      />

      <CaListSettings
        :active-products="totalCount"
        :current-sort="sort"
        @sortchange="sortChangeHandler($event)"
      />
      <div v-if="skip !== 0" class="ca-product-list__pagination">
        <div class="ca-product-list__showing">
          {{
            $t('PAGINATION_SHOWING', {
              sum: showing,
              total: totalCount
            })
          }}
          {{ $tc('PRODUCT', totalCount) }}
        </div>
        <CaButton class="ca-product-list__next" @clicked="loadPrev">
          {{ $t('LOAD_PREVIOUS') }}
        </CaButton>
      </div>
      <ul v-if="productList.length" class="ca-product-list">
        <CaProductCard
          v-for="(product, index) in productList"
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
              total: totalCount
            })
          }}
          {{ $tc('PRODUCT', totalCount) }}
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
import { CaContainer, CaButton, CaImage } from '@ralph/ralph-ui';
import CaProductCard from '@/components/organisms/CaProductCard/CaProductCard';
import CaListTop from '@/components/organisms/CaListTop/CaListTop';
import CaListSettings from '@/components/organisms/CaListSettings/CaListSettings';
import CaListFilters from '@/components/organisms/CaListFilters/CaListFilters';

export default {
  name: 'ProductPage',
  components: {
    CaContainer,
    CaButton,
    CaProductCard,
    CaListTop,
    CaListSettings,
    CaListFilters,
    CaImage
  },
  apollo: {
    products: {
      query: gql`
        query products(
          $skip: Int!
          $take: Int!
          $langCode: String!
          $categoryAlias: String!
          $sort: SortType!
          $filter: FilterInputType!
        ) {
          products(
            skip: $skip
            take: $take
            langCode: $langCode
            categoryAlias: $categoryAlias
            sort: $sort
            filter: $filter
          ) {
            products {
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
            count
            filters {
              brands {
                count
                name
              }
              categories {
                count
                name
              }
              discountCampaigns {
                count
                name
              }
              price {
                lowest
                highest
              }
            }
          }
        }
      `,
      variables() {
        return {
          skip: this.skip,
          take: this.take,
          langCode: this.$i18n.locale,
          categoryAlias: this.$route.params.category,
          sort: this.sort,
          filter: this.selection
        };
      },
      deep: true,
      result(result) {
        this.productList = result.data.products.products;
        this.totalCount = result.data.products.count;
        this.filters = result.data.products.filters;
        this.setInitPriceSelection(
          result.data.products.filters.price.lowest,
          result.data.products.filters.price.highest
        );
      }
    },
    listPageInfo: {
      query: gql`
        query listPageInfo($langCode: String!, $categoryAlias: String!) {
          listPageInfo(langCode: $langCode, categoryAlias: $categoryAlias) {
            alias
            primaryImage
            name
            primaryDescription
            secondaryDescription
            subCategories {
              alias
              activeProducts
              name
            }
          }
        }
      `,
      variables() {
        return {
          langCode: this.$i18n.locale,
          categoryAlias: this.$route.params.category
        };
      },
      result(result) {
        this.category = result.data.listPageInfo;
      }
    }
  },
  data() {
    return {
      category: {
        name: '',
        alias: '',
        primaryDescription: '',
        subCategories: []
      },
      productList: [],
      totalCount: 0,
      skip: 0,
      take: 15,
      pageSize: 15,
      sort: 'LATEST',
      defaultSort: 'LATEST',
      filters: {},
      selection: {
        categories: [],
        brands: []
      },
      filterParamQuery: {},
      queryPage: 1
    };
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.query.page) || 1;
    },
    allProductsLoaded() {
      return (
        this.take >= this.totalCount ||
        this.currentPage * this.pageSize >= this.totalCount
      );
    },
    showing() {
      return this.skip + 1 + ' - ' + (this.skip + this.productList.length);
    },
    filterQuery() {
      const queryObj = {};
      if (this.selection.categories && this.selection.categories.length) {
        queryObj.categories = this.selection.categories.join();
      }
      if (this.selection.brands && this.selection.brands.length) {
        queryObj.brands = this.selection.brands.join();
      }
      if (
        this.selection.price &&
        this.selection.price.lowest &&
        this.selection.price.lowest !== this.filters.price.lowest
      ) {
        queryObj.priceLowest = this.selection.price.lowest;
      }
      if (
        this.selection.price &&
        this.selection.price.highest &&
        this.selection.price.highest !== this.filters.price.highest
      ) {
        queryObj.priceHighest = this.selection.price.highest;
      }
      if (this.sort !== this.defaultSort) {
        queryObj.sort = this.sort;
      }
      if (this.queryPage > 1) {
        queryObj.page = this.queryPage;
      }
      return queryObj;
    }
  },
  mounted() {
    this.readURLParams();
  },
  methods: {
    loadMore() {
      this.take += this.pageSize;
      this.queryPage = this.currentPage + 1;
      this.pushURLParams();
    },
    loadPrev() {
      this.take += this.pageSize;
      this.skip -= this.pageSize;
      this.queryPage = this.currentPage - 1;
      this.pushURLParams();
    },
    setInitPriceSelection(lowest, highest) {
      if (!this.selection.price) {
        this.$set(this.selection, 'price', {});
        this.$set(this.selection.price, 'lowest', lowest);
        this.$set(this.selection.price, 'highest', highest);
      }
    },
    sortChangeHandler(newVal) {
      this.sort = newVal;
      this.pushURLParams();
    },
    filterChangeHandler(newVal) {
      this.selection = newVal;
      this.pushURLParams();
    },
    pushURLParams() {
      this.$router.push({
        path: this.$route.params.category,
        query: this.filterQuery
      });
    },
    readURLParams() {
      if (this.$route.query.categories) {
        this.selection.categories = this.$route.query.categories.split(',');
      }
      if (this.$route.query.brands) {
        this.selection.brands = this.$route.query.brands.split(',');
      }
      if (this.$route.query.priceLowest) {
        this.selection.price.lowest = this.$route.query.priceLowest;
      }
      if (this.$route.query.priceHighest) {
        this.selection.price.highest = this.$route.query.priceHighest;
      }
      if (this.$route.query.sort) {
        this.sort = this.$route.query.sort;
      }
      if (this.$route.query.page) {
        this.queryPage = parseInt(this.$route.query.page);
        this.skip = (parseInt(this.$route.query.page) - 1) * this.pageSize;
      }
    }
  }
};
</script>

<style lang="scss">
.ca-list-page {
  &__image {
    margin-bottom: $px32;
  }
}
.ca-product-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: -$list-spacing;
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
