export const state = () => ({
  type: ''
});

export const mutations = {
  setType(state, value) {
    state.type = value;
  }
};

export const actions = {
  set({ commit }, value) {
    commit('setType', value);
  },
  clear({ commit }) {
    commit('setType', '');
  }
};

export const getters = {
  isStudent(state) {
    /* Student-array lang support for multimarkets */
    const studentMarkets = ['student'];
    return studentMarkets.some((student) => state.type.includes(student));
  },
  isCurve(state) {
    return state.type.includes('curve');
  }
};