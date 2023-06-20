<template>
  <div class="ca-list-page ca-list-page--voyado">
    <CaContainer>
      <CaBreadcrumbs v-if="listInfo" :current="breadcrumbsCurrent" />
      <CaSkeleton v-else class="ca-breadcrumbs" width="10%" />
      <CaListTop :type="type" :list-info="listInfo" />
    </CaContainer>
    <CaWidgetArea
      class="ca-list-page__widget-area"
      family="Productlist"
      area-name="1. The top part of the product list"
      :list-page-url="pageReference"
    />
    <CaContainer>
      <div class="ca-list-page__filters">
        <CaListSettings :active-products="totalCount" />
      </div>

      <CaListPagination
        v-if="currentMinCount > 1"
        direction="prev"
        :showing="showing"
        :total-count="totalCount"
        :min-count="currentMinCount"
        :max-count="currentMaxCount"
        :all-products-loaded="allProductsLoaded"
        :loading="isLoading"
        @loadprev="loadPrev"
      />

      <CaProductList
        :skip="currentMinCount - 1"
        :page-size="pageSize"
        :products="productList"
        :products-fetched="!isLoading"
      />

      <CaListPagination
        direction="next"
        :showing="showing"
        :total-count="totalCount"
        :min-count="currentMinCount"
        :max-count="currentMaxCount"
        :all-products-loaded="allProductsLoaded"
        :loading="isLoading"
        @loadmore="loadMore"
      />

      <CaSeoText :text="seoCategoryPageText" />
    </CaContainer>
    <LazyVoyadoFilterPanel
      :external-sort-options="sortOptions"
      :current-sort="sort"
      :facets="facets"
      @reset="resetHandler"
      @sortchange="sortChangeHandler"
      @selectionchange="selectionChangeHandler"
    />
  </div>
</template>
<script>
/* 
  (Description of component) 
*/
import { VoyadoListPage } from '@geins/ralph-module-voyado-elevate';

export default {
  name: 'CaListPageVoyado',
  mixins: [VoyadoListPage],
  props: {},
  data: () => ({}),
  computed: {
    seoCategoryPageText() {
      return this.listInfo?.secondaryDescription;
    }
  },
  watch: {},
  mounted() {
    this.$store.dispatch('lastVisited/set', this.pageReference);
  },
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-list-page';
</style>
