<template>
  <div class="ca-list-settings">
    <div class="ca-list-settings__active-products">
      <strong>{{ activeProducts }}</strong> {{ $tc('PRODUCT', activeProducts) }}
    </div>
    <div class="ca-list-settings__sort">
      <span class="ca-list-settings__title">{{ $t('SORT_TITLE') }}:</span>
      <CaInputSelect v-model="sort" :options="sortOptions" />
    </div>
  </div>
</template>
<script>
import CaInputSelect from 'CaInputSelect';
// @group Organisms
// @vuese
export default {
  name: 'CaListSettings',
  components: { CaInputSelect },
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
    sort: 'LATEST'
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
  margin-bottom: $default-spacing;
  &__title {
    text-transform: uppercase;
    font-weight: $font-weight-bold;
    margin-right: $px16;
  }
  &__sort {
    display: flex;
    align-items: center;
  }
}
</style>
