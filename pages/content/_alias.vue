<template>
  <div class="ca-content-page">
    <CaContainer>
      <CaWidgetArea
        :alias="this.$route.params.alias"
        @dataFetched="$store.dispatch('loading/end')"
      />
    </CaContainer>
  </div>
</template>

<script>
export default {
  name: 'ContentPage',
  data: () => ({}),
  methods: {}
};
</script>

<style lang="scss"></style>
