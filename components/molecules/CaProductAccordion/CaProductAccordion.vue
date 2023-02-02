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
// @group Molecules
// @vuese
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
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-product-accordion {
  border-top: $border-light;
  @include bp(laptop) {
    border-left: $border-light;
    border-right: $border-light;
    .ca-accordion-item__toggle {
      font-size: $font-size-l;
    }
  }
  @include bp(tablet-down) {
    .ca-accordion-item__toggle {
      padding: 1rem ($default-spacing / 2);
    }
  }

  &__item-content {
    padding: $default-spacing / 2;
    @include bp(laptop) {
      padding: $px16;
    }
  }
}
</style>
