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
    </CaContainer>
    <CaWidgetArea
      class="ca-list-page__widget-area"
      family="Productlist"
      area-name="The top part of the product list"
      :filters="widgetAreaFilters"
    />
    <CaContainer>
      <CaListFilters
        v-if="showControls"
        :filters="filters"
        :selection="selection"
        :selection-active="filterSelectionActive"
        @selectionchange="filterChangeHandler($event)"
        @reset="resetFilters"
      />

      <CaListSettings
        v-if="showControls"
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
