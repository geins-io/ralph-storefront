<template>
  <div class="ca-content-page">
    <CaContainer>
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
    meta: undefined
  }),
  methods: {
    onDataFetched(meta) {
      this.$store.dispatch('loading/end');
      this.meta = meta;
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
