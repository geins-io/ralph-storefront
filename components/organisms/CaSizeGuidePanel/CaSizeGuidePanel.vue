<template>
  <LazyCaContentPanel
    class="ca-size-guide-panel"
    name="size-guide"
    enter-from="bottom"
    enter-from-tablet-up="right"
  >
    <template #header>
      <h1 class="ca-content-panel__title">
        {{ $t('SIZE_GUIDE') }}
      </h1>
    </template>
    <div class="ca-size-guide-panel__inner">
      <CaAccordionItem
        class="ca-size-guide-panel__accordion"
        base-tag="section"
      >
        <template #toggle-text>
          <h2>{{ $t('SIZE_GUIDE_CLOTHES') }}</h2>
        </template>
        <LazyCaWidgetArea
          class="ca-size-guide-panel__widget-area"
          family="Size guide"
          area-name="Clothes"
        />
      </CaAccordionItem>
      <CaAccordionItem
        class="ca-size-guide-panel__accordion"
        base-tag="section"
      >
        <template #toggle-text>
          <h2>{{ $t('SIZE_GUIDE_BRAS') }}</h2>
        </template>
        <LazyCaWidgetArea
          class="ca-size-guide-panel__widget-area"
          family="Size guide"
          area-name="Bra"
        />
      </CaAccordionItem>
      <CaAccordionItem
        class="ca-size-guide-panel__accordion"
        base-tag="section"
      >
        <template #toggle-text>
          <h2>{{ $t('SIZE_GUIDE_SHOES') }}</h2>
        </template>
        <LazyCaWidgetArea
          class="ca-size-guide-panel__widget-area"
          family="Size guide"
          area-name="Shoe"
        />
      </CaAccordionItem>
    </div>
  </LazyCaContentPanel>
</template>
<script>
/* 
  A panel with size guide widget areas inside
*/
export default {
  name: 'CaSizeGuidePanel',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-size-guide-panel';
</style>
