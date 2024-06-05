<template>
  <div class="ca-layout-undistracted">
    <main>
      <Nuxt />
    </main>
  </div>
</template>
<script>
export default {
  name: 'CaUndistractedLayout',
  mixins: [],
  data: () => ({}),
  // IMPORTANT NOTICE: If you decide to add a head() function here, you will overwrite default meta functionality that comes with MixGlobalInit from Ralph UI
};
</script>
<style lang="scss">
@import './styles/layouts/undistracted-layout';
</style>
