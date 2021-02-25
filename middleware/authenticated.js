export default function({ store, redirect }) {
  const checkIfRefreshed = async () => {
    const refreshed = await store.dispatch('auth/refreshToken');
    if (!refreshed) {
      return redirect('/');
    }
  };

  // If the user is not authenticated
  if (!store.getters['auth/isAuthenticated']) {
    if (store.getters['auth/needsRefresh']) {
      checkIfRefreshed();
    } else {
      return redirect('/');
    }
  }
}
