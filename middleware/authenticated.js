export default function({ store, redirect }) {
  const refresh = async () => {
    const refreshed = await store.dispatch('auth/initClient');
    console.log('refreshed', refreshed);
    if (!refreshed) {
      return redirect('/');
    }
  };

  // If the user is not authenticated
  if (!store.getters['auth/isAuthenticated']) {
    refresh();
  }
}
