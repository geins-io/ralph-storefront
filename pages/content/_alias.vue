<template>
  <div class="ca-content-page">
    <CaContainer
      class="ca-content-page__container"
      :class="{ 'ca-content-page__container--has-menu': hasMenu }"
      :design="hasMenu ? 'narrow' : 'full-width'"
    >
      <LazyCaInfoPageMenu
        v-if="hasMenu"
        class="ca-content-page__sidebar"
        menu-location-id="info-pages"
      />
      <CaWidgetArea :widget-data="widgetData" :alias="$route.params.alias" />
    </CaContainer>
  </div>
</template>

<script>
/*
  Renders a page for content from the CMS, for example a campaign page or a customer service page. 
  The page will show a menu if the CMS page is tagged with "menu"
*/
import MixContentPage from 'MixContentPage';
export default {
  name: 'ContentPage',
  mixins: [MixContentPage],
  data: () => ({}),
  methods: {},
  meta: {
    pageType: 'Content Page',
  },
};
</script>

<style lang="scss">
@import './styles/pages/content-page';
</style>
