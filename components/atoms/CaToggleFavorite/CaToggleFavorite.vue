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
.ca-toggle-favorite {
  @include iconCircle;
  width: rem-calc(40px);
  height: rem-calc(40px);
  position: absolute;
  right: 0;
  top: 0;
  font-size: rem-calc(18px);
  color: $c-text-secondary;
  transition: all 150ms ease;
  &--active {
    color: $c-white;
    background: $c-sale;
  }
}
</style>
