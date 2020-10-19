<template>
  <CaIconButton
    class="ca-toggle-favorite"
    :class="{
      'ca-toggle-favorite--active': $store.getters.isFavorite(prodId)
    }"
    :aria-label="ariaLabel"
    icon-name="heart"
    @clicked="$store.commit('toggleFavorite', prodId)"
  />
</template>
<script>
import CaIconButton from 'CaIconButton';
// @group Molecules
// @vuese
export default {
  name: 'CaToggleFavorite',
  components: { CaIconButton },
  mixins: [],
  props: {
    prodId: {
      type: Number,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    ariaLabel() {
      return this.$store.getters.isFavorite(this.prodId)
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
  width: rem-calc(40px);
  height: rem-calc(40px);
  border-radius: 50%;
  background: $c-white;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 0;
  top: 0;
  @include flex-calign;
  font-size: rem-calc(18px);
  color: $c-text-secondary;
  transition: all 150ms ease;
  &--active {
    color: $c-white;
    background: $c-sale;
  }
}
</style>
