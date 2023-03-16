<template>
  <div v-show="$store.getters.viewportComputer" class="ca-list-filters">
    <h2 class="ca-list-filters__title">
      {{ $t('FILTERS') }}
    </h2>
    <div v-show="filtersPopulated" class="ca-list-filters__filters">
      <CaFilterTrigger
        v-if="$config.showCategoryFilter"
        class="ca-list-filters__filter"
        :title="$t('FILTER_LABEL_CATEGORIES')"
        :selection="selection.categories"
        :filters="getFilters(filters.categories)"
        @clicked="
          $store.commit('contentpanel/open', {
            name: 'filters',
            frame: 'categories'
          })
        "
      />
      <CaFilterTrigger
        v-if="$config.showBrandsFilter"
        class="ca-list-filters__filter"
        :title="$t('FILTER_LABEL_BRANDS')"
        :selection="selection.brands"
        :filters="getFilters(filters.brands)"
        @clicked="
          $store.commit('contentpanel/open', {
            name: 'filters',
            frame: 'brands'
          })
        "
      />
      <CaFilterTrigger
        v-if="$config.showSkuFilter"
        class="ca-list-filters__filter"
        :title="$t('FILTER_LABEL_SKUS')"
        :selection="selection.skus"
        :filters="getFilters(filters.skus)"
        @clicked="
          $store.commit('contentpanel/open', {
            name: 'filters',
            frame: 'skus'
          })
        "
      />
      <CaFilterTrigger
        v-if="$config.showPriceFilter"
        class="ca-list-filters__filter"
        :title="$t('FILTER_LABEL_PRICE')"
        :selection="selection.price"
        :filters="getFilters(filters.price)"
        @clicked="
          $store.commit('contentpanel/open', {
            name: 'filters',
            frame: 'price'
          })
        "
      />
      <CaFilterTrigger
        v-for="(filter, index) in allParameters"
        :key="index"
        :title="filter.label"
        class="ca-list-filters__filter"
        :selection="getParameterSelection(filter.filterId)"
        @clicked="
          $store.commit('contentpanel/open', {
            name: 'filters',
            frame: filter.filterId
          })
        "
      />
    </div>
    <div v-show="!filtersPopulated" class="ca-list-filters__filters">
      <CaSkeleton class="ca-list-filters__filter" width="200px" height="40px" />
      <CaSkeleton class="ca-list-filters__filter" width="200px" height="40px" />
      <CaSkeleton class="ca-list-filters__filter" width="200px" height="40px" />
    </div>
  </div>
</template>
<script>
// @group Organisms
// @vuese
export default {
  name: 'CaListFilters',
  mixins: [],
  props: {
    filters: {
      type: Object,
      required: true
    },
    selection: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    allParameters: []
  }),
  computed: {
    filtersPopulated() {
      return (
        Object.keys(this.filters).length > 0 &&
        this.filters.constructor === Object
      );
    },
    parameters() {
      return this.filters?.parameters || null;
    }
  },
  watch: {
    parameters(newVal, oldVal) {
      if (oldVal === null && newVal.length) {
        this.allParameters = newVal;
      }
    }
  },
  mounted() {
    this.allParameters = this.parameters?.length ? this.parameters : [];
  },
  methods: {
    getParameterSelection(group) {
      const selection = this.selection.parameters[group];
      return selection || [];
    },
    getFilters(array) {
      return array ?? [];
    }
  }
};
</script>
<style lang="scss">
.ca-list-filters {
  @include bp(laptop) {
    border-top: $border-light;
    margin-bottom: $px24;
    padding-top: $px24;
  }
  &__title {
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    margin-bottom: $px12;
  }
  &__filters {
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: rem-calc(20px);
    row-gap: rem-calc(20px);
  }
}
</style>
