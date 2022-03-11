<template>
  <div class="ca-list-page" :class="modifier">
    <CaContainer>
      <CaBreadcrumbs v-if="listInfo" :current="breadcrumbsCurrent" />

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
        :all-products-loaded="allProductsLoaded"
        :loading="$apollo.queries.products.loading"
        @loadprev="loadPrev"
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
        :all-products-loaded="allProductsLoaded"
        :loading="$apollo.queries.products.loading"
        @loadmore="loadMore"
      />
    </CaContainer>
    <CaWidgetArea
      class="ca-list-page__widget-area"
      family="Productlist"
      area-name="The bottom part of the product list"
      :filters="widgetAreaFilters"
    />
  </div>
</template>
<script>
import MixListPage from 'MixListPage';

// @group Organisms
// @vuese
export default {
  name: 'CaListPage',
  mixins: [MixListPage],
  props: {},
  data: () => ({isWidgetSmartQuery: false}),
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
    }
  },
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
