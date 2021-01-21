<template>
  <div class="ca-list-page" :class="modifier">
    <CaContainer>
      <CaListTop :type="type" :list-info="listInfo" />

      <CaImage
        v-if="type === 'category' && listInfo && listInfo.primaryImage"
        class="ca-list-page__image"
        size="1280w"
        type="categoryheader"
        :alt="listInfo.name"
        :filename="listInfo.primaryImage"
        :ratio="271 / 1280"
        sizes="(min-width: 1360px) 1320px, 96vw"
      />
      <CaSkeleton
        v-else-if="!listInfo"
        class="ca-list-page__image"
        :ratio="271 / 1280"
        :radius="false"
      />

      <CaWidgetArea
        class="ca-list-page__widget-area"
        family="Productlist"
        area-name="The top part of the product list"
      />

      <CaListFilters
        :filters="filters"
        :selection="selection"
        :selection-active="filterSelectionActive"
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
        :loading="$apollo.queries.products.loading"
        @loadprev="loadPrev"
      />

      <CaProductList
        :skip="currentMinCount - 1"
        :page-size="pageSize"
        :products="productList"
        :filters-active="filterSelectionActive"
      />

      <CaListPagination
        v-if="productList.length"
        direction="next"
        :showing="showing"
        :total-count="totalCount"
        :all-products-loaded="allProductsLoaded"
        :loading="$apollo.queries.products.loading"
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
import CaSkeleton from 'CaSkeleton';

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
    CaWidgetArea,
    CaSkeleton
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
    margin: 0 0 $px32 0;
  }
  &__widget-area {
    margin: 0 0 $px32 0;
  }
}
</style>
