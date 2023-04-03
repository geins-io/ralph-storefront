<template>
  <div class="ca-list-page" :class="modifier">
    <CaContainer>
      <CaBreadcrumbs v-if="listInfo" :current="breadcrumbsCurrent" />
      <CaSkeleton v-else class="ca-breadcrumbs" width="10%" />
      <CaListTop v-if="!hideListInfo" :type="type" :list-info="listInfo" />
    </CaContainer>
    <CaWidgetArea
      class="ca-list-page__widget-area"
      :family="widgetAreaVars[0].family"
      :area-name="widgetAreaVars[0].areaName"
      :filters="widgetAreaFilters"
      :is-parent-loaded="!isWidgetSmartQuery"
      :loaded-data="widgetData.widgetArea_0"
      @variables-change="isWidgetSmartQuery = true"
    />
    <CaContainer>
      <div class="ca-list-page__filters">
        <CaListSettings
          v-if="showControls"
          :active-products="totalCount"
          :active-filters="totalFiltersActive"
        />
      </div>

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
        :current-count="currentMaxCount"
        :all-products-loaded="allProductsLoaded"
        :loading="$apollo.queries.products.loading"
        @loadmore="loadMore"
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
  data: () => ({ isWidgetSmartQuery: false }),
  computed: {
    widgetAreaVars() {
      const obj = {
        family: 'Productlist',
        areaName: 'The top part of the product list',
        alias: '',
        preview: false
      };

      obj.filters = this.widgetAreaFilters;
      obj.customerType = this.$store.state.customerType;
      obj.displaySetting =
        this.$store.getters.viewport === 'phone' ? 'mobile' : 'desktop';
      const array = [];
      array.push(obj);

      return array;
    },
    seoCategoryPageText() {
      return this.listInfo?.secondaryDescription;
    }
  },
  watch: {},
  created() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-list-page';
</style>
