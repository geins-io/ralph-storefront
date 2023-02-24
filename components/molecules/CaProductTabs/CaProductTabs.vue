<template>
  <div class="ca-product-tabs">
    <CaTabs
      v-if="tabs.length > 0"
      :tabs="tabs"
      :selected-tab="selectedTab"
      @clicked="setSelectedTab"
    >
      <template #panels>
        <CaTabPanel
          v-for="(tab, index) in tabs"
          :key="index"
          :index="index"
          :selected-tab="selectedTab"
          :title="tab.label"
          :panel-count="tabs.length"
        >
          <CaHtml
            v-if="tab.panel"
            class="ca-tabs__panel-content"
            :content="tab.panel"
          />
        </CaTabPanel>
      </template>
    </CaTabs>
  </div>
</template>
<script>
/*
  CaProductTabs is a reusable component that can be used to show all sorts of product information
  It receives one prop:
  - product: a required object representing the product
  Computed properties:
  - tabs: an array of objects representing the tabs
  Methods:
  - setSelectedTab: a method that sets the selected tab
*/
export default {
  name: 'CaProductTabs',
  mixins: [],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    selectedTab: 0
  }),
  computed: {
    tabs() {
      return [
        {
          label: this.$t('PRODUCT_DESCRIPTION'),
          panel: this.product.texts.text1
        },
        {
          label: this.$t('PRODUCT_SPECIFICATION'),
          panel: this.product.texts.text2
        },
        {
          label: 'Ingredienser',
          panel: this.product.texts.text3
        }
      ];
    }
  },
  watch: {},
  mounted() {},
  methods: {
    setSelectedTab(data) {
      this.selectedTab = data;
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-product-tabs';
</style>
