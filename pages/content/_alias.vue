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
        this.$nuxt.error({ statusCode: 404, message: 'Page not found' });
        this.$store.dispatch('redirect404');
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
        }
      ]
    };
  },
  meta: {
    pageType: 'Product Page'
  }
};
</script>

<style lang="scss">
.ca-content-page {
  &__container {
    &--has-menu {
      .ca-container {
        width: 100%;
      }

      @include bp(tablet) {
        display: flex;
        column-gap: $px32;
      }
    }
  }
  &__sidebar {
    @include bp(tablet) {
      width: rem-calc(200);
      flex-shrink: 0;
    }
    @include bp(laptop) {
      width: rem-calc(300);
      flex-shrink: 0;
    }
  }
}
</style>
