<template>
  <div class="ca-favorites-page">
    <CaContainer>
      <h1 class="ca-favorites-page__title">{{ $t('FAVORITES_LABEL') }}</h1>
      <CaProductList
        v-if="allProducts.length"
        class="ca-favorites-page__list"
        :products="allProducts"
        :page-size="favorites.length"
      />
      <p v-else class="ca-favorites-page__empty">
        {{ $t('FAVORITES_EMPTY') }}
      </p>
    </CaContainer>
  </div>
</template>

<script>
/*
  Renders the favorites page.
*/
import MixFavoritesPage from 'MixFavoritesPage';
export default {
  name: 'FavoritesPage',
  mixins: [MixFavoritesPage],

  data: () => ({}),
  computed: {},
  methods: {},
  meta: {
    pageType: 'Favorite Page'
  }
};
</script>

<style lang="scss">
@import './styles/pages/favorites-page';
</style>
