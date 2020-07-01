<template>
  <div class="ca-list-filters">
    <h3 class="ca-list-filters__title">{{ $t('FILTERS') }}</h3>
    <div class="ca-list-filters__filters">
      <CaFilter
        v-if="filters.categories && filters.categories.length > 1"
        class="ca-list-filters__filter"
        :title="$t('FILTER_LABEL_CATEGORIES')"
        :values="filters.categories"
        :selection="selection.categories"
        @selectionchange="currentSelection.categories = $event"
      />
      <CaFilter
        v-if="filters.brands && filters.brands.length > 1"
        class="ca-list-filters__filter"
        :title="$t('FILTER_LABEL_BRANDS')"
        :values="filters.brands"
        :selection="selection.brands"
        @selectionchange="currentSelection.brands = $event"
      />
      <CaFilter
        v-if="
          filters.price &&
            selection.price &&
            filters.price.lowest !== filters.price.highest
        "
        class="ca-list-filters__filter"
        type="range"
        :title="$t('FILTER_LABEL_PRICE')"
        :values="filters.price"
        :selection="selection.price"
        @selectionchange="currentSelection.price = $event"
      />
      <!-- <CaFilter
        v-if="filters.discountCampaigns && filters.discountCampaigns.length"
        class="ca-list-filters__filter"
        :title="$t('FILTER_LABEL_CAMPAIGNS')"
        :values="filters.discountCampaigns"
        :selection="selection.discountCampaigns"
        @selectionchange="currentSelection.discountCampaigns = $event"
      /> -->
    </div>
  </div>
</template>
<script>
import CaFilter from '@/components/molecules/CaFilter/CaFilter';
// @group Organisms
// @vuese
export default {
  name: 'CaListFilters',
  components: { CaFilter },
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
    currentSelection: {}
  }),
  computed: {},
  watch: {
    currentSelection: {
      deep: true,
      handler(val) {
        this.$emit('selectionchange', val);
      }
    }
  },
  mounted() {
    this.currentSelection = this.selection;
  },
  methods: {}
};
</script>
<style lang="scss">
.ca-list-filters {
  padding-top: $px24;
  border-top: $border-light;
  margin-bottom: $px32;
  &__title {
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    margin-bottom: $px12;
  }
  &__filters {
    position: relative;
    display: flex;
    width: 70%;
  }
  &__filter {
    &:not(:last-child) {
      margin-right: $px20;
    }
  }
}
</style>
