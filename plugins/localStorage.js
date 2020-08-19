import createPersistedState from 'vuex-persistedstate';

export default ({ store, isHMR }) => {
  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration of
  // vuex-persistedstate plugin
  // Found solution here: https://github.com/nuxt/nuxt.js/issues/972
  if (isHMR) return;

  window.onNuxtReady(nuxt => {
    createPersistedState({
      key: 'ralph'
    })(store); // vuex plugins can be connected to store, even after creation
  });
};
