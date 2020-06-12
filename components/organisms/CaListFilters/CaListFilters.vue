<template>
  <div class="ca-list-filters">
    <CaFilter
      class="ca-list-filters__filter"
      :title="$t('FILTER_LABEL_CATEGORIES')"
      :values="filters.categories"
      :selection="selection.categories"
      @selectionchange="currentSelection.categories = $event"
    />

    <CaFilter
      class="ca-list-filters__filter"
      :title="$t('FILTER_LABEL_BRANDS')"
      :values="filters.brands"
      :selection="selection.brands"
      @selectionchange="currentSelection.brands = $event"
    />
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
  position: relative;
  display: flex;
  width: 70%;
  margin-bottom: $px32;
  &__filter {
    &:not(:last-child) {
      margin-right: $px20;
    }
  }
}
</style>
