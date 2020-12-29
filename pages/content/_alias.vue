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
import CaContainer from 'CaContainer';
import CaWidgetArea from 'CaWidgetArea';
export default {
  name: 'ContentPage',
  components: {
    CaContainer,
    CaWidgetArea
  },
  data: () => ({}),
  methods: {}
};
</script>

<style lang="scss"></style>
