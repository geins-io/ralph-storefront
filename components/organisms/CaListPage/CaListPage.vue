<template>
  <div class="ca-list-page" :class="modifier">
    <CaContainer v-if="listInfo !== null">
      <CaListTop :type="type" :list-info="listInfo" />

      <CaImage
        v-if="type === 'category' && listInfo.primaryImage"
        class="ca-list-page__image"
        size="1280w"
        type="categoryheader"
        :filename="listInfo.primaryImage"
        :placeholder="listInfo.primaryImage"
      />

      <CaWidgetArea
        class="ca-list-page__widget-area"
        family="Productlist"
        area-name="The top part of the product list"
      />

      <CaListFilters
        :filters="filters"
        :selection="selection"
        @selectionchange="filterChangeHandler($event)"
        @reset="resetFilters"
      />

      <CaListSettings
        :active-products="totalCount"
        :current-sort="sort"
        @sortchange="sortChangeHandler($event)"
      />

      <CaListPagination
        v-if="currentMinCount > 1"
        direction="prev"
        :showing="showing"
        :total-count="totalCount"
        :all-products-loaded="allProductsLoaded"
        @loadprev="loadPrev"
      />

      <CaProductList
        :skip="currentMinCount - 1"
        :page-size="pageSize"
        :products="productList"
      />

      <CaListPagination
        direction="next"
        :showing="showing"
        :total-count="totalCount"
        :all-products-loaded="allProductsLoaded"
        @loadmore="loadMore"
      />

      <CaWidgetArea
        class="ca-list-page__widget-area"
        family="Productlist"
        area-name="The bottom part of the product list"
      />
    </CaContainer>
  </div>
</template>
<script>
import CaContainer from 'CaContainer';
import CaImage from 'CaImage';
import CaWidgetArea from 'CaWidgetArea';
import CaListPagination from 'CaListPagination';
import CaListTop from 'CaListTop';
import CaListFilters from 'CaListFilters';
import CaListSettings from 'CaListSettings';
import CaProductList from 'CaProductList';
import MixListPageFunctions from 'MixListPageFunctions';

// @group Organisms
// @vuese
export default {
  name: 'CaListPage',
  components: {
    CaContainer,
    CaListPagination,
    CaProductList,
    CaListTop,
    CaListSettings,
    CaListFilters,
    CaImage,
    CaWidgetArea
  },
  mixins: [MixListPageFunctions],
  apollo: {
    products: {
      query() {
        return this.productsQuery;
      },
      variables() {
        return this.productsQueryVars;
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
        if (this.$store.getters['list/relocateProduct']) {
          this.relocateProduct();
        }
        if (this.currentMaxCount > this.totalCount) {
          this.currentMaxCount = this.totalCount;
        }
      },
      skip() {
        return this.skipProductsQuery;
      }
    },
    listPageInfo: {
      query() {
        return this.infoQuery;
      },
      variables() {
        return this.infoQueryVars;
      },
      result(result) {
        this.listInfo = result.data.listPageInfo;
      }
    }
  },
  props: {
    type: {
      type: String,
      default: 'category' // 'brand', 'search', 'favorites'
    },
    infoQuery: {
      type: Object,
      required: true
    },
    productsQuery: {
      type: Object,
      required: true
    },
    currentAlias: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    modifier() {
      return 'ca-list-page--' + this.type;
    },
    isCategory() {
      return this.type === 'category';
    },
    isBrand() {
      return this.type === 'brand';
    },
    infoQueryVars() {
      const varsObj = {
        apiKey: this.$store.getters.currentApiKey
      };
      if (this.isCategory) {
        this.$set(varsObj, 'categoryAlias', this.currentAlias);
      }
      if (this.isBrand) {
        this.$set(varsObj, 'brandAlias', this.currentAlias);
      }
      return varsObj;
    },
    productsQueryVars() {
      const varsObj = {
        skip: this.skip,
        take: this.pageSize,
        apiKey: this.$store.getters.currentApiKey,
        sort: this.sort,
        filter: this.selection
      };
      if (this.isCategory) {
        this.$set(varsObj, 'categoryAlias', this.currentAlias);
      }
      if (this.isBrand) {
        this.$set(varsObj, 'brandAlias', this.currentAlias);
      }
      return varsObj;
    },
    loadMoreQueryVars() {
      const varsObj = {
        skip: this.currentMaxCount,
        take: this.pageSize,
        apiKey: this.$store.getters.currentApiKey,
        sort: this.sort,
        filter: this.selection
      };
      if (this.isCategory) {
        this.$set(varsObj, 'categoryAlias', this.currentAlias);
      }
      if (this.isBrand) {
        this.$set(varsObj, 'brandAlias', this.currentAlias);
      }

      return varsObj;
    },
    loadPrevQueryVars() {
      const varsObj = {
        skip: this.currentMinCount - 1 - this.pageSize,
        take: this.pageSize,
        apiKey: this.$store.getters.currentApiKey,
        sort: this.sort,
        filter: this.selection
      };
      if (this.isCategory) {
        this.$set(varsObj, 'categoryAlias', this.currentAlias);
      }
      if (this.isBrand) {
        this.$set(varsObj, 'brandAlias', this.currentAlias);
      }

      return varsObj;
    }
  },
  watch: {},
  created() {
    this.initProductList();
  },
  methods: {}
};
</script>
<style lang="scss">
.ca-list-page {
  &__image {
    margin-bottom: $px32;
  }
}
</style>
