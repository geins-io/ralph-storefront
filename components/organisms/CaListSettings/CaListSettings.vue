<template>
  <div class="ca-list-settings">
    <div class="ca-list-settings__active-products">
      {{ activeProducts }}
      {{ $tc('PRODUCT_LOWERCASE', activeProducts) }}
    </div>

    <CaClickable
      class="ca-list-settings__filter-toggle"
      @clicked="
        $store.commit('contentpanel/open', {
          name: 'filters'
        })
      "
    >
      <CaIconAndText
        class="ca-list-settings__icon-text"
        icon-name="filter"
        icon-position="right"
        base-element="div"
      >
        <div class="ca-list-settings__filter-button-wrap">
          {{ $t('FILTER_SORT') }}
        </div>
      </CaIconAndText>
    </CaClickable>
  </div>
</template>
<script>
/*
  Renders the list settings component. 
  To override defaultSortOptions, add your own "defaultSortOptions" array to data

  Props:
    activeProducts: Number
      The number of active products.
    activeFilters: Number
      The number of active filters.


*/
export default {
  name: 'CaListSettings',
  mixins: [],
  props: {
    activeProducts: {
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
