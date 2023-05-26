export const state = () => ({
  voyadoId: ''
});

export const mutations = {
  setVoyadoId(state, value) {
    state.voyadoId = typeof value === 'string' ? value : '';
  }
};

export const actions = {};

export const getters = {};
