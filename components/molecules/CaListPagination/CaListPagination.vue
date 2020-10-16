<template>
  <div class="ca-list-pagination">
    <div class="ca-list-pagination__showing">
      {{
        $t('PAGINATION_SHOWING', {
          sum: showing,
          total: totalCount
        })
      }}
      {{ $tc('PRODUCT', totalCount) }}
    </div>
    <CaButton
      v-if="direction === 'next'"
      class="ca-list-pagination__button ca-list-pagination__button--next"
      :disabled="allProductsLoaded"
      :loading="loading"
      @clicked="$emit('loadmore')"
    >
      {{ $t('LOAD_MORE') }}
    </CaButton>
    <CaButton
      v-else
      class="ca-list-pagination__button ca-list-pagination__button--prev"
      :loading="loading"
      @clicked="$emit('loadprev')"
    >
      {{ $t('LOAD_PREVIOUS') }}
    </CaButton>
  </div>
</template>
<script>
import CaButton from 'CaButton';
// @group Molecules
// @vuese
export default {
  name: 'CaListPagination',
  components: { CaButton },
  mixins: [],
  props: {
    direction: {
      type: String,
      default: 'next', // 'prev'
      validator(value) {
        return ['next', 'prev'].includes(value);
      }
    },
    showing: {
      type: String,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    },
    allProductsLoaded: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
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
.ca-list-pagination {
  padding: $px32 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__button {
    overflow-anchor: none;
  }
  &__showing {
    margin-bottom: $px12;
  }
}
</style>
