<template>
  <CaWidgetArea
    v-if="isAuthenticated"
    preview
    @dataFetched="$store.dispatch('loading/end')"
  />
</template>

<script>
/*
  Renders a widget area preview page.
*/
import MixWidgetPreview from 'MixWidgetPreview';
export default {
  name: 'WidgetPreview',
  mixins: [MixWidgetPreview],
  meta: {
    pageType: 'Preview Page',
  },
};
</script>
