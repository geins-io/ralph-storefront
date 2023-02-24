<template>
  <div class="ca-404-page"></div>
</template>

<script>
/*
  Renders the 404 page.
*/
export default {
  name: 'Error404Page',
  data: () => ({}),
  beforeCreate() {
    this.$nuxt.error({ statusCode: 404, message: 'Page not found' });
  },
  methods: {},
  meta: {
    pageType: 'Error Page'
  }
};
</script>
