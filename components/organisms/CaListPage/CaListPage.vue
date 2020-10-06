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
import MixListPage from 'MixListPage';

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
  mixins: [MixListPage],

  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  created() {},
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
