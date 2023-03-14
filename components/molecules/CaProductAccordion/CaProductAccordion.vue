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
      class="ca-product-accordion__item"
      base-tag="section"
    >
      <template #toggle-text>
        <h2>{{ $t('PRODUCT_SPECIFICATION') }}</h2>
      </template>
      <div class="ca-product-accordion__item-content">
        <CaProductInfo
          v-if="getParameterText('material')"
          :title="$t('MATERIAL')"
        >
          {{ getParameterText('material') }}
        </CaProductInfo>
        <CaProductInfo
          v-if="getParameterText('washinginstructions')"
          :title="$t('LAUNDRY_GUIDE')"
        >
          {{ getParameterText('washinginstructions') }}
        </CaProductInfo>
        <CaProductInfo :title="$t('PRODUCT_ID')">
          {{ product.productId }}
        </CaProductInfo>
        <CaProductInfo :title="$t('BRAND')">
          <NuxtLink :to="product.brand.canonicalUrl">
            {{ product.brand.name }}
          </NuxtLink>
        </CaProductInfo>
        <CaProductInfo v-if="getParameterText('color')" :title="$t('COLOR')">
          {{ getParameterText('color') }}
        </CaProductInfo>
        <CaProductInfo
          v-if="getParameterText('factory')"
          :title="$t('PRODUCED_IN')"
        >
          {{ getParameterText('factory') }}
        </CaProductInfo>
      </div>
    </CaAccordionItem>
    <CaAccordionItem class="ca-product-accordion__item" base-tag="section">
      <template #toggle-text>
        <h2>{{ $t('DELIVERY_PAYMENT') }}</h2>
      </template>
      <div class="ca-product-accordion__item-content"></div>
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
      required: true
    }
  },
  data: () => ({}),
  computed: {
    productDetails() {
      return this.product.parameterGroups.find(i => i.parameterGroupId === 1);
    }
  },
  watch: {},
  mounted() {},
  methods: {
    getParameterText(id) {
      const parameter = this.productDetails?.parameters.find(
        i => i.identifier === id
      );
      return parameter ? parameter.value : '';
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-product-accordion';
</style>
