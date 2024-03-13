<template>
  <div class="ca-front-page">
    <CaWidgetArea
      family="Frontpage"
      area-name="The front page area"
      :fetch-products-on-server="true"
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
  data: () => ({}),
  methods: {},
  meta: {
    pageType: 'Front Page',
  },
};
</script>
