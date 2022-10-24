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
// @group Organisms
// @vuese
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
