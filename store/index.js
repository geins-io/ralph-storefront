export const state = () => ({
  counter: 0,
  favorites: ['1111', '1122'],
  VATincluded: true
});

export const mutations = {
  increment(state) {
    state.counter++;
  },
  toggleFavorite(state, prodID) {
    const favorites = state.favorites;
    if (favorites.includes(prodID)) {
      favorites.splice(favorites.indexOf(prodID), 1);
    } else {
      favorites.push(prodID);
    }
  },
  setVATincluded(state, vatincluded) {
    state.VATincluded = vatincluded;
  }
};
