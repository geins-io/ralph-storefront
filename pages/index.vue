<template>
  <div class="ca-front-page">
    <client-only>
      <CaWidgetArea
        family="Frontpage"
        area-name="The front page area"
        @dataFetched="$store.dispatch('loading/end')"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'FrontPage',
  components: {
    CaWidgetArea: () => import('~/node_modules/@ralph/ralph-ui/components/molecules/CaWidgetArea/CaWidgetArea')
  },
  data: () => ({}),
  methods: {}
};
</script>

<style lang="scss"></style>
