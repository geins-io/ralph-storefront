<template>
  <div class="ca-content-page">
    <CaContainer
      class="ca-content-page__container"
      :class="{ 'ca-content-page__container--has-menu': hasMenu }"
      :design="hasMenu ? 'default' : 'full-width'"
    >
      <CaInfoPageMenu
        v-if="hasMenu"
        class="ca-content-page__sidebar"
        menu-location-id="info-pages"
      />
      <CaWidgetArea
        :alias="this.$route.params.alias"
        @dataFetched="onDataFetched"
      />
    </CaContainer>
  </div>
</template>

<script>
/*
  Renders a content page.

  apollo:
    widgetArea: The widget area query.

  methods:
    onDataFetched: Called when the widget area data is fetched.

  head(): Sets the page title and meta tags.

*/
import MixMetaReplacement from 'MixMetaReplacement';
export default {
  name: 'ContentPage',
  mixins: [MixMetaReplacement],
  data: () => ({
    meta: undefined,
    hasMenu: false
  }),
  methods: {
    onDataFetched(data) {
      if (
        (data?.widgetArea === null || data?.widgetArea === undefined) &&
        !process.server
      ) {
        if (this.$nuxt.$route.path !== '/404') {
          this.$store.dispatch('redirect404');
        }
      }
      this.meta = data?.widgetArea?.meta;
      this.hasMenu = data?.widgetArea?.tags.includes('menu');
      this.$store.dispatch('loading/end');
    }
  },
  head() {
    return {
      title: this.metaReplacement(this.meta?.title),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaReplacement(this.meta?.description)
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.metaReplacement(this.meta?.title)
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.metaReplacement(this.meta?.description)
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.$config.baseUrl + '/meta-image-fallback.jpg'
        }
      ]
    };
  },
  meta: {
    pageType: 'Content Page'
  }
};
</script>

<style lang="scss">
@import 'organisms/ca-content-page';
</style>
