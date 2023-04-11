<template>
  <LazyCaContentPanel
    class="ca-quickshop-panel"
    name="quickshop"
    enter-from="bottom"
    enter-from-tablet-up="right"
  >
    <template #header>
      <h1 class="ca-content-panel__title">
        {{ $t('PICK_SIZE') }}
      </h1>
      <button
        class="ca-quickshop-panel__size-guide-button"
        @click="
          $store.commit('contentpanel/open', {
            name: 'size-guide'
          })
        "
      >
        {{ $t('SIZE_GUIDE') }}
      </button>
    </template>
    <div class="ca-quickshop-panel__inner">
      <CaQuickshop />
    </div>
  </LazyCaContentPanel>
</template>
<script>
/* 
  A panel with quickshop component inside
*/
export default {
  name: 'CaQuickshopPanel',
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
@import 'organisms/ca-quickshop-panel';
</style>
