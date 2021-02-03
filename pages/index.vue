<template>
  <div class="ca-front-page">
    <CaContainer>
      <CaWidgetArea
        family="Frontpage"
        area-name="The front page area"
        @dataFetched="$store.dispatch('loading/end')"
      />
    </CaContainer>
  </div>
</template>

<script>
export default {
  name: 'FrontPage',
  data: () => ({}),
  methods: {}
};
</script>

<style lang="scss"></style>
