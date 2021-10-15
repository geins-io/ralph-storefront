<template>
  <div class="ca-404-page"></div>
</template>

<script>
export default {
  name: 'Error404Page',
  data: () => ({}),
  beforeCreate() {
    this.$nuxt.error({ statusCode: 404, message: 'Page not found' });
  },
  methods: {}
};
</script>
