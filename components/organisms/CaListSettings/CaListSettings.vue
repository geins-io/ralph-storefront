<template>
  <div class="ca-list-settings">
    <div class="ca-list-settings__active-products">
      <strong>{{ activeProducts }}</strong> {{ $tc('PRODUCT', activeProducts) }}
    </div>
  </div>
</template>
<script>
// @group Organisms
// @vuese
export default {
  name: 'CaListSettings',
  components: {},
  mixins: [],
  props: {
    activeProducts: {
      type: Number,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-list-settings {
}
</style>
