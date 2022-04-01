import VuexPersistence from 'vuex-persist'
import cookie from 'cookie';

export default ({ store, req, app }) => {
  new VuexPersistence({
    key: 'ralph',
    modules: [
      'favorites',
      'customerType',
      'vatIncluded',
      'list.relocateAlias',
      'list.relocatePage'
    ],
    storage: {
      getItem: key => {
        // See https://nuxtjs.org/guide/plugins/#using-process-flags
        if (process.server) {
          const headerCookies = req.headers.cookie || '';
          const parsedCookies = cookie.parse(headerCookies);
          return parsedCookies[key];
        } else {
          return app.$cookies.get(key);
        }
      },
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) =>
        app.$cookies.set(key, value, {
          expires: new Date(new Date().getTime() + 31536000000),
          secure: false
        }),
      removeItem: key => app.$cookies.remove(key)
    }
  }).plugin(store);
};
