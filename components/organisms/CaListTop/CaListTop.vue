<template>
  <div class="ca-list-top">
    <div v-if="type === 'search' || type === 'all'" class="ca-list-top__text">
      <h1 v-if="listInfo && listInfo.name" class="ca-list-top__title">
        {{ listInfo.name }}
      </h1>
    </div>
    <div v-else class="ca-list-top__text">
      <h1 v-if="listInfo && !listInfo.hideTitle" class="ca-list-top__title">
        {{ listInfo.name }}
      </h1>
      <CaSkeleton
        v-else-if="!listInfo"
        class="ca-list-top__title ca-list-top__title--skeleton"
        width="30%"
      />
      <CaReadMore
        v-if="
          listInfo && !!listInfo.primaryDescription && !listInfo.hideDescription
        "
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
<style lang="scss">
@import 'organisms/ca-list-top';
</style>
