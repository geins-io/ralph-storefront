<template>
  <!--eslint-disable vue/no-v-html-->
  <div class="ca-list-top">
    <div class="ca-list-top__text">
      <h1 class="ca-list-top__title">{{ title }}</h1>
      <CaReadMore v-if="description !== ''" class="ca-list-top__description">
        <div v-html="description"></div>
      </CaReadMore>
    </div>
    <ul
      v-if="subCategories && subCategories.length"
      class="ca-list-top__subcategories"
    >
      <li
        v-for="(category, index) in activeCategories"
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
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    subCategories: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({}),
  computed: {
    activeCategories() {
      return this.subCategories
        ? this.subCategories.filter(item => item.activeProducts !== 0)
        : [];
    }
  },
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
    border-bottom: $border-light;
    padding-bottom: $px32;
    margin-bottom: $px24;
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
