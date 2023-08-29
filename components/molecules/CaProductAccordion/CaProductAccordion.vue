<template>
  <div class="ca-product-accordion">
    <CaAccordionItem
      class="ca-product-accordion__item"
      base-tag="section"
      :open-on-init="true"
    >
      <template #toggle-text>
        <h2>{{ $t('PRODUCT_DESCRIPTION') }}</h2>
      </template>
      <CaHtml
        v-if="product.texts.text2"
        class="ca-product-accordion__item-content"
        :content="product.texts.text2"
      />
      <div v-else class="ca-product-accordion__item-content">
        {{ $t('NO_PRODUCT_DESCRIPTION') }}
      </div>
    </CaAccordionItem>
    <CaAccordionItem
      v-if="product.parameterGroups !== null"
      class="ca-product-accordion__item only-mobile"
      base-tag="section"
    >
      <template #toggle-text>
        <h2>{{ $t('PRODUCT_SPECIFICATION') }}</h2>
      </template>
      <div class="ca-product-accordion__item-content">
        <CaSpecifications :specification-groups="product.parameterGroups" />
      </div>
    </CaAccordionItem>
    <CaAccordionItem
      v-if="product.texts.text3"
      class="ca-product-accordion__item"
      base-tag="section"
    >
      <template #toggle-text>
        <h2>Ingredienser</h2>
      </template>
      <CaHtml
        class="ca-product-accordion__item-content"
        :content="product.texts.text3"
      />
    </CaAccordionItem>
  </div>
</template>
<script>
/*
  CaProductAccordion is a reusable component that can be used to show all types of product information
  It receives one prop:
  - product: a required object representing the product
*/
export default {
  name: 'CaProductAccordion',
  mixins: [],
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-product-accordion';
</style>
