<template>
  <!--eslint-disable vue/no-v-html-->
  <div class="ca-list-top">
    <div class="ca-list-top__text">
      <h1 class="ca-list-top__title">{{ listInfo.name }}</h1>
      <CaReadMore
        v-if="listInfo.primaryDescription !== ''"
        class="ca-list-top__description"
      >
        <div v-html="listInfo.primaryDescription"></div>
      </CaReadMore>
    </div>
    <CaCategoryDisplay
      class="ca-list-top__subcategories"
      :categories="listInfo.subCategories"
    />
  </div>
</template>
<script>
import CaCategoryDisplay from 'CaCategoryDisplay';
import CaReadMore from 'CaReadMore';
// @group Organisms
// @vuese
export default {
  name: 'CaListTop',
  components: { CaCategoryDisplay, CaReadMore },
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
  @include bp(laptop) {
    text-align: left;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: $px32;
  }
  &__text {
    @include bp(laptop) {
      width: 50%;
      max-width: 700px;
    }
  }
  &__title {
    font-size: $font-size-l;
    font-weight: $font-weight-bold;
    margin-bottom: $px4;
    @include bp(tablet) {
      font-size: $font-size-xxl;
      margin-bottom: $px8;
    }
  }
  &__subcategories {
    margin: $px20 -1.2rem $px32 0;
    max-width: 100%;
    @include bp(laptop) {
      margin: -$px8;
      width: 40%;
      max-width: 525px;
    }
  }
}
</style>
