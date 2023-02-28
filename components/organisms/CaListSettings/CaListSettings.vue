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

  Props:
    activeProducts: Number
      The number of active products.
    currentSort: String
      The current sort value.
    activeFilters: Number
      The number of active filters.

  Events:
    sortchange: String
      Emitted when the sort value changes.

*/
export default {
  name: 'CaListSettings',
  mixins: [],
  props: {
    activeProducts: {
      type: Number,
      required: true
    },
    currentSort: {
      type: String,
      required: true
    },
    activeFilters: {
      type: Number,
      required: true
    }
  },
  data: vm => ({
    sortOptions: [
      {
        label: vm.$t('SORT_LABEL_LATEST'),
        value: 'LATEST'
      },
      {
        label: vm.$t('SORT_LABEL_BESTSELLERS'),
        value: 'MOST_SOLD'
      },
      {
        label: vm.$t('SORT_LABEL_LOWEST_PRICE'),
        value: 'PRICE'
      },
      {
        label: vm.$t('SORT_LABEL_HIGHEST_PRICE'),
        value: 'PRICE_DESC'
      }
    ],
    sort: null
  }),
  computed: {},
  watch: {
    sort(newVal, oldVal) {
      if (oldVal !== null) {
        this.$emit('sortchange', newVal);
      }
    },
    currentSort() {
      this.sort = this.currentSort;
    }
  },
  mounted() {
    this.sort = this.currentSort;
  },
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-list-settings';
</style>
