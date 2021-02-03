<template>
  <div class="ca-front-page">
    <CaContainer>
      <CaWidgetArea
        family="Frontpage"
        area-name="The front page area"
        @dataFetched="onDataFetched"
      />
    </CaContainer>
  </div>
</template>

<script>
export default {
  name: 'FrontPage',
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
