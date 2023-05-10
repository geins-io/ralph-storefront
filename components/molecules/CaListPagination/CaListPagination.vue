<template>
  <div class="ca-list-pagination" :class="'ca-list-pagination--' + direction">
    <CaListCountBar
      v-if="direction === 'next'"
      :min-count="minCount"
      :max-count="maxCount"
      :total-count="totalCount"
    />
    <div class="ca-list-pagination__showing">
      {{ paginationText }}
      {{ $tc('PRODUCT_LOWERCASE', totalCount) }}
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
/*
  CaListPagination is a reusable component that displays a message and a button to load more products.
  It receives five props:
  - direction: a string representing the direction of the pagination ('next' or 'prev')
  - showing: a string representing the number of products currently shown
  - totalCount: a number representing the total number of products
  - allProductsLoaded: a boolean representing whether all products have been loaded
  - loading: a boolean representing whether the products are currently loading
  It emits an event when the button is clicked:
  - loadmore: load more button has been clicked
  - loadprev: load previous button has been clicked
*/
export default {
  name: 'CaListPagination',
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
    },
    minCount: {
      type: Number,
      required: true
    },
    maxCount: {
      type: Number,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    isPartial() {
      return this.minCount > 1;
    },
    paginationText() {
      return this.isPartial
        ? this.$t('PAGINATION_SHOWING_PARTIAL', {
            sum: this.showing,
            total: this.totalCount
          })
        : this.$t('PAGINATION_SHOWING', {
            sum: this.maxCount,
            total: this.totalCount
          });
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-list-pagination';
</style>
