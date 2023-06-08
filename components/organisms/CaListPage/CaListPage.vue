<template>
  <div class="ca-list-page" :class="modifier">
    <CaContainer>
      <CaBreadcrumbs v-if="listInfo" :current="breadcrumbsCurrent" />
      <CaSkeleton v-else class="ca-breadcrumbs" width="10%" />
      <CaListTop
        v-if="!hideListInfo"
        :type="type"
        :list-info="listInfo"
        :categories="filters.categories"
      />
    </CaContainer>
    <CaWidgetArea
      class="ca-list-page__widget-area"
      family="Productlist"
      area-name="1. The top part of the product list"
      :filters="widgetAreaFilters"
      :list-page-url="currentPath"
    />
    <CaContainer>
      <div class="ca-list-page__filters">
        <CaListSettings
          v-if="showControls"
          :active-products="totalCount"
          :active-filters="totalFiltersActive"
        />
      </div>

      <CaListPagination
        v-show="currentMinCount > 1"
        direction="prev"
        :showing="showing"
        :total-count="totalCount"
        :min-count="currentMinCount"
        :max-count="currentMaxCount"
        :all-products-loaded="allProductsLoaded"
        :loading="$apollo.queries.products.loading"
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
        :loading="$apollo.queries.products.loading"
        @loadmore="loadMore"
        @reset="resetCurrentPage"
      />

      <CaSeoText :text="seoCategoryPageText" />
    </CaContainer>

    <LazyCaFilterPanel
      :filters="filters"
      :selection="selection"
      :selection-active="filterSelectionActive"
      :total-products="totalCount"
      :total-filters-active="totalFiltersActive"
      :current-sort="selection.sort"
      @selectionchange="filterChangeHandler"
      @sortchange="sortChangeHandler"
      @reset="resetFilters"
    />
  </div>
</template>
<script>
/*
  CaListPage is the main component for the product list pages.
*/
import MixListPage from 'MixListPage';

export default {
  name: 'CaListPage',
  mixins: [MixListPage],
  props: {},
  data: () => ({}),
  computed: {
    seoCategoryPageText() {
      return this.listInfo?.secondaryDescription;
    }
  },
  watch: {
    breadcrumbsCurrent(value) {
      this.$store.dispatch('lastVisited/set', value.canonical);
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-list-page';
</style>
