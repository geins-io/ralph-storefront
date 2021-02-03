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
export default {
  name: 'ContentPage',
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
      title: this.meta?.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta?.description
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.meta?.title
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.meta?.description
        }
      ]
    };
  }
};
</script>

<style lang="scss"></style>
