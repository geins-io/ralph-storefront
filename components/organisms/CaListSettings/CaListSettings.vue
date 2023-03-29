<template>
  <div class="ca-list-settings">
    <CaClickable
      class="ca-list-settings__filter-toggle only-mobile"
      @clicked="
        $store.commit('contentpanel/open', {
          name: 'filters'
        })
      "
    >
      <CaIconAndText
        class="ca-list-settings__icon-text"
        icon-name="chevron-right"
        icon-position="right"
        base-element="div"
      >
        <div class="ca-list-settings__filter-button-wrap">
          {{ $t('FILTERS') }}
          <CaNotificationBadge
            :number="activeFilters"
            :positioned="false"
            class="ca-list-settings__active-filters"
          />
        </div>
      </CaIconAndText>
    </CaClickable>
    <div class="ca-list-settings__sort">
      <span class="ca-list-settings__title only-computer">
        {{ $t('SORT_TITLE') }}:
      </span>
      <CaInputSelect
        v-if="sort"
        v-model="sort"
        class="ca-list-settings__sort-select"
        :options="sortOptions"
      />
    </div>
    <div class="ca-list-settings__active-products">
      <strong>{{ activeProducts }}</strong>
      {{ $tc('PRODUCT_LOWERCASE', activeProducts) }}
    </div>
  </div>
</template>
<script>
import MixProductListSort from 'MixProductListSort';
/*
  Renders the list settings component. 
  To override defaultSortOptions, add your own "defaultSortOptions" array to data

  Props:
    activeProducts: Number
      The number of active products.
    activeFilters: Number
      The number of active filters.
    currentSort: String
      The current sort of the product list (this prop exists in MixProductListSort)

  Events:
    sortchange: String
      Emitted (from Mixin MixProductListSort) when the sort value changes.

*/
export default {
  name: 'CaListSettings',
  mixins: [MixProductListSort],
  props: {
    activeProducts: {
      type: Number,
      required: true
    },
    activeFilters: {
      type: Number,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-list-settings';
</style>
