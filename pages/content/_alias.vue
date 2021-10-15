<template>
  <div class="ca-content-page">
    <CaWidgetArea
      :alias="this.$route.params.alias"
      @dataFetched="onDataFetched"
    />
  </div>
</template>

<script>
import MixMetaReplacement from 'MixMetaReplacement';
export default {
  name: 'ContentPage',
  mixins: [MixMetaReplacement],
  data: () => ({
    meta: undefined
  }),
  methods: {
    onDataFetched(data) {
      if (data.widgetArea === null && !process.server) {
        this.$nuxt.error({ statusCode: 404, message: 'Page not found' });
        this.$store.dispatch('redirect404');
      }
      this.$store.dispatch('loading/end');
      this.meta = data.meta;
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
  }
};
</script>

<style lang="scss"></style>
