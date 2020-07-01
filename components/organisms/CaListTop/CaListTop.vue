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
    <ul
      v-if="listInfo.subCategories && listInfo.subCategories.length"
      class="ca-list-top__subcategories"
    >
      <li
        v-for="(category, index) in listInfo.subCategories"
        :key="index"
        class="ca-list-top__category-item"
      >
        <CaButton :href="'/c/' + category.alias" size="s">
          {{ category.name }}
        </CaButton>
      </li>
    </ul>
  </div>
</template>
<script>
import { CaButton, CaReadMore } from '@ralph/ralph-ui';
// @group Organisms
// @vuese
export default {
  name: 'CaListTop',
  components: { CaButton, CaReadMore },
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
    display: flex;
    overflow: auto;
    @include bp(laptop) {
      width: 40%;
      max-width: 525px;
      margin: -$px8;
      overflow: hidden;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
  }

  &__category-item {
    @include bp(laptop-down) {
      margin-right: $px12;
    }
    @include bp(laptop) {
      margin: $px8;
    }
  }
}
</style>
