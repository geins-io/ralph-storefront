<template>
  <div class="ca-list-settings">
    <button
      class="ca-list-settings__filter-toggle only-mobile"
      @click="
        $store.commit('contentpanel/open', {
          name: 'filters'
        })
      "
    >
      <CaIconAndText
        class="ca-list-settings__icon-text"
        icon-name="chevron-right"
        icon-position="right"
      >
        {{ $t('FILTERS') }}
      </CaIconAndText>
    </button>
    <div class="ca-list-settings__sort">
      <span class="ca-list-settings__title only-computer">
        {{ $t('SORT_TITLE') }}:
      </span>
      <CaInputSelect
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
import CaInputSelect from 'CaInputSelect';
import CaIconAndText from 'CaIconAndText';

// @group Organisms
// @vuese
export default {
  name: 'CaListSettings',
  components: { CaInputSelect, CaIconAndText },
  mixins: [],
  props: {
    activeProducts: {
      type: Number,
      required: true
    },
    currentSort: {
      type: String,
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
    sort: vm.$config.productListDefaultSort
  }),
  computed: {},
  watch: {
    sort(val) {
      this.$emit('sortchange', val);
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
.ca-list-settings {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 -#{$default-spacing/2} $default-spacing;
  margin-top: $px20;
  @include bp(laptop) {
    margin: 0 0 $default-spacing;
  }
  &__filter-toggle {
    width: 50%;
    height: 46px;
    border: $border-light;
    background: $c-lightest-gray;
    padding: 0 $px16;
  }
  &__icon-text {
    width: 100%;
    justify-content: space-between;
  }
  &__title {
    text-transform: uppercase;
    font-weight: $font-weight-bold;
    margin-right: $px16;
  }
  &__sort {
    display: flex;
    align-items: center;
    width: 50%;
    @include bp(laptop) {
      order: 2;
      width: auto;
    }
  }

  &__sort-select {
    width: 100%;
    .ca-input-select__select-wrap {
      height: 46px;
    }
    @include bp(laptop) {
      width: auto;
    }
  }
  &__active-products {
    margin-left: $default-spacing/2;
    margin-top: $px12;
    @include bp(laptop) {
      order: 1;
    }
  }
}
</style>
