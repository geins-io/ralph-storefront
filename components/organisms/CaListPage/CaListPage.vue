<template>
  <div class="ca-list-page" :class="modifier">
    <CaContainer>
      <CaBreadcrumbs v-if="listInfo" :current="breadcrumbsCurrent" />
      <CaSkeleton v-else class="ca-breadcrumbs" width="30%" />
      <CaListTop :type="type" :list-info="listInfo" />
    </CaContainer>
    <CaWidgetArea
      class="ca-list-page__widget-area"
      family="Productlist"
      area-name="The top part of the product list"
      :filters="widgetAreaFilters"
      :list-page-url="currentPath"
    />
    <CaContainer>
      <CaListFilters
        v-if="showControls && selection"
        :filters="filters"
        :selection="selection"
      />
      <CaActiveFilters
        v-if="showControls && selection && $store.getters.viewportComputer"
        :selection="selection"
        :selection-active="filterSelectionActive"
        @selectionchange="filterChangeHandler"
        @reset="resetFilters"
      />
      <LazyCaFilterPanel
        :filters="filters"
        :selection="selection"
        :selection-active="filterSelectionActive"
        :total-products="totalCount"
        :total-filters-active="totalFiltersActive"
        @selectionchange="filterChangeHandler"
        @reset="resetFilters"
      />

      <CaListSettings
        v-if="showControls"
        :active-products="totalCount"
        :active-filters="totalFiltersActive"
        :current-sort="selection.sort"
        @sortchange="sortChangeHandler"
      />

      <CaListPagination
        v-show="currentMinCount > 1"
        direction="prev"
        :showing="showing"
        :total-count="totalCount"
        :min-count="currentMinCount"
        :max-count="currentMaxCount"
        :all-products-loaded="allProductsLoaded"
        :loading="prevPageLoading"
        @loadprev="loadPrev"
        @reset="resetCurrentPage"
      />

      <CaProductList
        :skip="currentMinCount - 1"
        :page-size="pageSize"
        :products="productList"
        :products-fetched="productsFetched"
      />

      <CaListPagination
        v-if="showControls"
        direction="next"
        :showing="showing"
        :total-count="totalCount"
        :min-count="currentMinCount"
        :max-count="currentMaxCount"
        :all-products-loaded="allProductsLoaded"
        :loading="nextPageLoading"
        @loadmore="loadMore"
        @reset="resetCurrentPage"
      />
    </CaContainer>
    <CaWidgetArea
      class="ca-list-page__widget-area"
      family="Productlist"
      area-name="The bottom part of the product list"
      :filters="widgetAreaFilters"
      :list-page-url="currentPath"
    />
  </div>
</template>
<script>
/*
  CaListPage is the main component for the product list pages.
  Please refer to the documentation of MixListPage in Ralph UI for more info.
*/
import MixListPage from 'MixListPage';

export default {
  name: 'CaListPage',
  mixins: [MixListPage],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  created() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'organisms/ca-list-page';
</style>
