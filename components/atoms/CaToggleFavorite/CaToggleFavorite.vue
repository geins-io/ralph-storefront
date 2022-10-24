<template>
  <CaIconButton
    class="ca-toggle-favorite"
    :class="{
      'ca-toggle-favorite--active': $store.getters.isFavorite(prodAlias)
    }"
    :aria-label="ariaLabel"
    icon-name="heart"
    @clicked="$store.commit('toggleFavorite', prodAlias)"
  />
</template>
<script>
// @group Molecules
// @vuese
export default {
  name: 'CaToggleFavorite',
  mixins: [],
  props: {
    prodAlias: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    ariaLabel() {
      return this.$store.getters.isFavorite(this.prodAlias)
        ? this.$t('REMOVE_FAVORITE')
        : this.$t('ADD_FAVORITE');
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
  @import 'atoms/ca-toggle-favorite';
</style>
