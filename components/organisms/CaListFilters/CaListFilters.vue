<template>
  <div class="ca-list-filters">
    <h3 v-if="$store.getters.viewportLaptop" class="ca-list-filters__title">
      {{ $t('FILTERS') }}
    </h3>
    <div v-if="$store.getters.viewportLaptop" class="ca-list-filters__filters">
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
    <CaContentPanel
      name="filters"
      enter-from-mobile="left"
      :only-mobile="true"
      :title="$t('FILTERS')"
    >
      <CaAccordionItem
        v-if="filters.categories && filters.categories.length > 1"
        class="ca-list-filters__toggle"
      >
        <template v-slot:toggle>{{ $t('FILTER_LABEL_CATEGORIES') }}</template>
        <CaFilterMulti
          :values="filters.categories"
          :selection="selection.categories"
          @selectionchange="currentSelection.categories = $event"
        />
      </CaAccordionItem>
      <CaAccordionItem v-if="filters.brands && filters.brands.length > 1">
        <template v-slot:toggle>{{ $t('FILTER_LABEL_BRANDS') }}</template>
        <CaFilterMulti
          :values="filters.brands"
          :selection="selection.brands"
          @selectionchange="currentSelection.brands = $event"
        />
      </CaAccordionItem>
      <CaAccordionItem
        v-if="
          filters.price &&
            selection.price &&
            filters.price.lowest !== filters.price.highest
        "
      >
        <template v-slot:toggle>{{ $t('FILTER_LABEL_PRICE') }}</template>
        <CaFilterRange
          :values="filters.price"
          :selection="selection.price"
          @selectionchange="currentSelection.price = $event"
        />
      </CaAccordionItem>
      <template v-slot:footer>
        <div class="ca-list-filters__buttons-wrap">
          <CaButton
            class="ca-list-filters__button-reset"
            color="secondary"
            size="l"
            type="full-width"
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
    </CaContentPanel>
  </div>
</template>
<script>
import CaFilter from 'CaFilter';
import CaFilterMulti from 'CaFilterMulti';
import CaFilterRange from 'CaFilterRange';
import CaContentPanel from 'CaContentPanel';
import CaButton from 'CaButton';
import CaAccordionItem from 'CaAccordionItem';
import eventbus from '~/plugins/event-bus.js';
// @group Organisms
// @vuese
export default {
  name: 'CaListFilters',
  components: {
    CaFilter,
    CaContentPanel,
    CaButton,
    CaAccordionItem,
    CaFilterMulti,
    CaFilterRange
  },
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
  methods: {
    resetFilters() {
      this.$emit('reset');
    },
    closeContentPanel() {
      eventbus.$emit('close-content-panel');
    }
  }
};
</script>
<style lang="scss">
.ca-list-filters {
  @include bp(laptop) {
    border-top: $border-light;
    margin-bottom: $px32;
    padding-top: $px24;
  }
  &__title {
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    margin-bottom: $px12;
  }
  &__filters {
    position: relative;
    display: flex;
    flex-wrap: wrap;

    @include bp(laptop) {
      width: 70%;
    }
  }
  &__filter {
    &:not(:last-child) {
      margin-right: $px20;
    }
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
