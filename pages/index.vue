<template>
  <div class="ca-front-page">
    <CaWidgetArea
      family="Frontpage"
      area-name="The front page area"
      @dataFetched="$store.dispatch('loading/end')"
    />
  </div>
</template>

<script>
/*
  Renders the front page.
*/
export default {
  name: 'FrontPage',
  meta: {
    pageType: 'Front Page',
  },
};
</script>
<style lang="scss">
@import './styles/pages/front-page';
</style>
