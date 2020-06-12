<template>
  <div class="ca-list-page ca-list-page--category">
    <CaContainer v-if="category !== null">
      <CaListTop
        :title="category.name"
        :description="category.description"
        :sub-categories="category.subCategories"
      />

      <CaListFilters
        :filters="filters"
        :selection="selection"
        @selectionchange="selection = $event"
      />

      <CaListSettings
        :active-products="totalCount"
        :current-sort="sort"
        @sortchange="sort = $event"
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
import { CaContainer, CaButton } from '@ralph/ralph-ui';
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
    CaListFilters
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
          langCode: this.$i18n.locale,
          categoryAlias: this.$route.params.category
        };
      },
      result(result) {
        this.category = result.data.listPageInfo;
        // this.filters = result.data.listPageInfo.filters;
      }
    }
  },
  data() {
    return {
      category: {
        name: '',
        alias: '',
        primaryDescription: '',
        subCategories: {}
      },
      productList: [],
      totalCount: 0,
      skip: 0,
      take: 15,
      pageSize: 15,
      sort: 'LATEST',
      filters: {
        categories: [
          {
            id: 123,
            name: 'Lakrits'
          },
          {
            id: 321,
            name: 'Kampanj'
          }
        ],
        brands: [
          {
            id: 123,
            name: 'Godis.se'
          },
          {
            id: 321,
            name: 'DeLafée'
          },
          {
            id: 454,
            name: 'Fazer'
          }
        ],
        price: {
          lowest: 20.0,
          highest: 599.0
        },
        discountCampaigns: [
          {
            id: 123,
            name: '3 för 2 på ljus choklad'
          }
        ],
        genders: null,
        parameters: [
          {
            id: 123,
            filterType: 'multi', // or "range"
            name: 'Förpackning',
            options: [
              {
                id: 123,
                name: 'Påse'
              },
              {
                id: 124,
                name: 'Låda'
              },
              {
                id: 125,
                name: 'Burk'
              }
            ]
          }
        ]
      },
      selection: {
        categories: [],
        brands: []
      }
    };
  },
  computed: {
    // currentCategory() {
    //   return this.categories
    //     ? this.categories.filter(
    //         item => item.alias === this.$route.params.category
    //       )[0]
    //     : null;
    // },
    // subLevelCategories() {
    //   return this.categories
    //     ? this.categories.filter(
    //         item => item.parentCategoryId === this.currentCategory.categoryId
    //       )
    //     : [];
    // },
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
    }
  },
  mounted() {
    if (this.$route.query.page) {
      this.skip = (parseInt(this.$route.query.page) - 1) * this.pageSize;
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
    },
    sortChangeHandler(val) {}
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
