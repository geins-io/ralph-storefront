<template>
  <div class="ca-list-filters">
    <h2 v-if="$store.getters.viewportComputer" class="ca-list-filters__title">
      {{ $t('FILTERS') }}
    </h2>
    <div
      v-if="$store.getters.viewportComputer"
      class="ca-list-filters__filters"
    >
      <CaFilter
        v-if="filtersPopulated"
        class="ca-list-filters__filter"
        :title="$t('FILTER_LABEL_CATEGORIES')"
        :values="filters.categories"
        :selection="selection.categories"
        @selectionchange="updateSelection($event, 'categories')"
      />
      <CaSkeleton
        v-else
        class="ca-list-filters__filter"
        width="200px"
        height="40px"
      />
      <CaFilter
        v-if="filtersPopulated"
        class="ca-list-filters__filter"
        :title="$t('FILTER_LABEL_BRANDS')"
        :values="filters.brands"
        :selection="selection.brands"
        @selectionchange="updateSelection($event, 'brands')"
      />
      <CaSkeleton
        v-else
        class="ca-list-filters__filter"
        width="200px"
        height="40px"
      />
      <CaFilter
        v-if="filtersPopulated"
        class="ca-list-filters__filter"
        :title="$t('FILTER_LABEL_SKUS')"
        :values="filters.skus"
        :selection="selection.skus"
        @selectionchange="updateSelection($event, 'skus')"
      />
      <CaSkeleton
        v-else
        class="ca-list-filters__filter"
        width="200px"
        height="40px"
      />
      <div
        v-for="(filter, index) in filters.parameters"
        :key="index"
        class="ca-list-filters__filter"
      >
        <CaFilter
          v-if="filtersPopulated"
          :title="filter.label"
          :values="filter.values"
          :selection="getParameterSelection(filter.filterId)"
          @selectionchange="
            updateSelection($event, 'parameters', filter.filterId)
          "
        />
        <CaSkeleton v-else width="200px" height="40px" />
      </div>
      <button
        v-if="selectionActive"
        type="button"
        class="ca-list-filters__reset"
        @click="resetFilters"
      >
        <CaIconAndText class="ca-list-filters__reset-text" icon-name="x-circle">
          {{ $t('RESET_FILTER') }}
        </CaIconAndText>
      </button>
    </div>
    <div class="ca-list-filters__selection"></div>
    <LazyCaContentPanel
      v-if="filters"
      name="filters"
      enter-from="left"
      :title="$t('FILTERS')"
    >
      <CaAccordionItem
        v-if="filters.categories && filters.categories.length > 1"
        class="ca-list-filters__toggle"
      >
        <template #toggle-text>{{ $t('FILTER_LABEL_CATEGORIES') }}</template>
        <LazyCaFilterMulti
          :values="filters.categories"
          :selection="selection.categories"
          @selectionchange="updateSelection($event, 'categories')"
        />
      </CaAccordionItem>
      <CaAccordionItem v-if="filters.brands && filters.brands.length > 1">
        <template #toggle-text>{{ $t('FILTER_LABEL_BRANDS') }}</template>
        <LazyCaFilterMulti
          :values="filters.brands"
          :selection="selection.brands"
          @selectionchange="updateSelection($event, 'brands')"
        />
      </CaAccordionItem>
      <CaAccordionItem v-if="filters.skus && filters.skus.length > 1">
        <template #toggle-text>{{ $t('FILTER_LABEL_SKUS') }}</template>
        <LazyCaFilterMulti
          :values="filters.skus"
          :selection="selection.skus"
          @selectionchange="updateSelection($event, 'skus')"
        />
      </CaAccordionItem>
      <template #footer>
        <div class="ca-list-filters__buttons-wrap">
          <CaButton
            class="ca-list-filters__button-reset"
            color="secondary"
            size="l"
            type="full-width"
            :disabled="!selectionActive"
            @clicked="resetFilters"
          >
            {{ $t('RESET_FILTER') }}
          </CaButton>
          <CaButton
            class="ca-list-filters__button-apply"
            size="l"
            type="full-width"
            @clicked="closeContentPanel"
          >
            {{ $t('APPLY_FILTER') }}
          </CaButton>
        </div>
      </template>
    </LazyCaContentPanel>
  </div>
</template>
<script>
import eventbus from '~/plugins/event-bus.js';

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
    },
    selectionActive: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    currentSelection: {}
  }),
  computed: {
    filtersPopulated() {
      return (
        Object.keys(this.filters).length > 0 &&
        this.filters.constructor === Object
      );
    }
  },
  watch: {},
  mounted() {
    this.currentSelection = this.selection;
  },
  methods: {
    resetFilters() {
      this.$emit('reset');
    },
    closeContentPanel() {
      eventbus.$emit('close-content-panel');
    },
    updateSelection(selection, type, group = null) {
      const selectionData = {
        type,
        selection: null
      };

      if (group) {
        const obj = this.currentSelection.parameters;
        if (obj[group]) {
          obj[group] = selection;
        } else {
          this.$set(obj, group, selection);
        }
        this.$set(this.currentSelection, 'parameters', obj);
        selectionData.type = group;
      } else {
        this.currentSelection[type] = selection;
      }
      selectionData.selection = this.currentSelection;
      this.$emit('selectionchange', selectionData);
    },
    getParameterSelection(group) {
      const selection = this.selection.parameters[group];
      return selection || [];
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
  &__filter {
  }
  &__active {
    margin-top: $px16;
  }
  &__reset {
    text-decoration: underline;
    text-align: left;
  }
  &__wrapper {
    padding: $px16;
    background: $c-lightest-gray;
  }
  &__buttons-wrap {
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    padding: $px12;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__button-apply {
    flex: 1;
    margin-left: $px12;
    font-size: $font-size-s;
  }
  &__button-reset {
    flex: 0;
    font-size: $font-size-s;
  }
}
</style>
