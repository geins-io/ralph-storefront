<template>
  <div class="ca-list-top">
    <div v-if="type !== 'search'" class="ca-list-top__text">
      <h1 v-if="listInfo" class="ca-list-top__title">{{ listInfo.name }}</h1>
      <CaSkeleton
        v-else
        class="ca-list-top__title ca-list-top__title--skeleton"
        width="30%"
      />
      <CaReadMore
        v-if="listInfo && listInfo.primaryDescription !== ''"
        class="ca-list-top__description"
      >
        <CaHtml :content="listInfo.primaryDescription" />
      </CaReadMore>
      <div
        v-else-if="!listInfo"
        class="ca-list-top__description ca-list-top__description--skeleton"
      >
        <CaSkeleton width="70%" />
        <CaSkeleton />
        <CaSkeleton width="60%" />
      </div>
    </div>
    <div v-else class="ca-list-top__text">
      <h1 class="ca-list-top__title">{{ listInfo.name }}</h1>
    </div>
    <CaCategoryDisplay
      v-if="listInfo && listInfo.subCategories"
      class="ca-list-top__subcategories"
      :categories="listInfo.subCategories"
    />
  </div>
</template>
<script>
// @group Organisms
// @vuese
export default {
  name: 'CaListTop',
  mixins: [],
  props: {
    type: {
      type: String,
      required: true
    },
    listInfo: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.ca-list-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 0 $px32;
  @include bp(laptop) {
    text-align: left;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
  &__text {
    width: 100%;
    @include bp(laptop) {
      width: 50%;
      max-width: 700px;
    }
  }
  &__title {
    font-size: $font-size-l;
    font-weight: $font-weight-bold;
    margin: 0 0 $px4;
    @include bp(tablet) {
      font-size: $font-size-xxl;
      margin: 0 0 $px8;
    }
    &--skeleton {
      margin: 0 auto $px8;
      @include bp(tablet) {
        margin: 0 0 $px8;
      }
    }
  }

  &__description {
    &--skeleton {
      @include bp(tablet-down) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
  &__subcategories {
    margin: $px20 -1.2rem 0 0;
    max-width: 100%;
    @include bp(laptop) {
      margin: -$px8;
      width: 40%;
      max-width: 525px;
    }
  }
}
</style>
