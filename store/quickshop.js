export const state = () => ({
  product: null,
  notifyVariant: null
});

export const mutations = {
  setProduct(state, product) {
    state.product = product;
  },
  setNotifyVariant(state, variant) {
    state.notifyVariant = variant;
  }
};

export const actions = {
  open({ commit }, product) {
    commit('setProduct', product);
    commit(
      'contentpanel/open',
      {
        name: 'quickshop'
      },
      { root: true }
    );
  }
};

export const getters = {};
