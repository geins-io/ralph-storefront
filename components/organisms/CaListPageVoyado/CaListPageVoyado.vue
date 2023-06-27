<template>
  <div class="ca-list-page ca-list-page--voyado">
    <CaContainer>
      <CaBreadcrumbs v-if="listInfo" :current="breadcrumbsCurrent" />
      <CaSkeleton v-else class="ca-breadcrumbs" width="10%" />
      <CaListTop
        :type="type"
        :list-info="listInfo"
        :categories="filterCategories"
      />
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
      :show-sort-at-top="true"
      @reset="resetHandler"
      @sortchange="sortChangeHandler"
      @selectionchange="selectionChangeHandler"
    />
  </div>
</template>
<script>
/*
  The Voyado list page 
*/
import { VoyadoListPage } from '@geins/ralph-module-voyado-elevate';
import filtersQuery from 'productlist/list-filters.graphql';

export default {
  name: 'CaListPageVoyado',
  mixins: [VoyadoListPage],
  apollo: {
    productFilters: {
      query() {
        return filtersQuery;
      },
      variables() {
        return {
          skip: 0,
          take: 0,
          filter: null,
          url: this.pageReference
        };
      },
      result(result) {
        if (result && result.data) {
          this.baseFilters = result.data.products.filters;
        }
      },
      update: data => data.products.filters,
      skip() {
        return !process.client || this.baseFilters;
      },
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      }
    }
  },
  props: {},
  data: () => ({
    baseFilters: null
  }),
  computed: {
    seoCategoryPageText() {
      return this.listInfo?.secondaryDescription;
    },
    filterCategories() {
      if (!this.baseFilters) {
        return [];
      }
      const categories = this.baseFilters.facets.find(
        i => i.type === 'Category'
      );

      return categories?.values || [];
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
