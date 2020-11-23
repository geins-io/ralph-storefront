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
import CaContainer from 'CaContainer';
import CaWidgetArea from 'CaWidgetArea';
export default {
  name: 'FrontPage',
  components: {
    CaContainer,
    CaWidgetArea
  },
  data: () => ({}),
  methods: {}
};
</script>

<style lang="scss"></style>
