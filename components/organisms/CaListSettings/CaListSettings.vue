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
import { CaInputSelect } from '@ralph/ralph-ui';
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
    }
  },
  data: vm => ({
    sortOptions: [
      {
        label: vm.$t('SORT_LABEL_LATEST'),
        value: 'latest'
      },
      {
        label: vm.$t('SORT_LABEL_BESTSELLERS'),
        value: 'bestsellers'
      },
      {
        label: vm.$t('SORT_LABEL_LOWEST_PRICE'),
        value: 'priceASC'
      },
      {
        label: vm.$t('SORT_LABEL_HIGHEST_PRICE'),
        value: 'priceDESC'
      }
    ],
    sort: 'latest'
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-list-settings {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
