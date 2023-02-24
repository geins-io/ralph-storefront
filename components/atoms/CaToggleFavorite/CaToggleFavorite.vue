<template>
  <CaIconButton
    class="ca-toggle-favorite"
    :class="{
      'ca-toggle-favorite--active': isFavorite
    }"
    :aria-label="ariaLabel"
    icon-name="heart"
    @clicked="toggleFavorite"
  />
</template>
<script>
/*
  CaToggleFavorite is a reusable component that displays a button to toggle a product as favorite.
  It receives two props:
  - prodAlias: a string representing the product alias (deprecated)
  - prodId: a number representing the product id (use this!)
*/
export default {
  name: 'CaToggleFavorite',
  mixins: [],
  props: {
    prodAlias: {
      type: String,
      required: true
    },
    prodId: {
      type: Number,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    isFavorite() {
      return (
        this.$store.getters.isFavorite(this.prodId) ||
        this.$store.getters.isFavorite(this.prodAlias)
      );
    },
    ariaLabel() {
      return this.isFavorite
        ? this.$t('REMOVE_FAVORITE')
        : this.$t('ADD_FAVORITE');
    }
  },
  watch: {},
  mounted() {},
  methods: {
    toggleFavorite() {
      const favorites = this.$store.state.favorites;
      const isAliases = favorites.length && typeof favorites[0] === 'string';
      const newFavorite = isAliases ? this.prodAlias : this.prodId;
      this.$store.commit('toggleFavorite', newFavorite);
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-toggle-favorite';
</style>
