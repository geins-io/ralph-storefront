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
      <CaListPagination
        v-if="skip !== 0"
        direction="prev"
        :showing="showing"
        :total-count="totalCount"
        :all-products-loaded="allProductsLoaded"
        @loadPrev="loadPrev"
      />
      <CaProductList :products="productList" />
      <CaListPagination
        direction="next"
        :showing="showing"
        :total-count="totalCount"
        :all-products-loaded="allProductsLoaded"
        @loadMore="loadMore"
      />
    </CaContainer>
  </div>
</template>
<script>
import { CaContainer, CaImage, MixListPageFunctions } from '@ralph/ralph-ui';
import CaListTop from '@/components/organisms/CaListTop/CaListTop';
import CaListFilters from '@/components/organisms/CaListFilters/CaListFilters';
import CaListSettings from '@/components/organisms/CaListSettings/CaListSettings';
import CaListPagination from '@/components/molecules/CaListPagination/CaListPagination';
import CaProductList from '@/components/organisms/CaProductList/CaProductList';
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
    CaImage
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
        take: this.take,
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
    this.readURLParams();
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
