<template>
  <component :is="errorPage" :error="error" />
</template>

<script>
export default {
  name: 'CaErrorLayout',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === 404) {
        return 'CaError404';
      }
      // catch everything else
      return 'CaError';
    }
  },
  created() {
    this.$store.dispatch('loading/end');
  }
};
</script>
<style lang="scss"></style>
