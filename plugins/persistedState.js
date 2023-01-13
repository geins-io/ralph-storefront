import VuexPersistence from 'vuex-persist';
import cookie from 'cookie';

export default ({ store, req, app }) => {
  const defaultConfigCookie = {
    path: '/',
    secure: false
  };

  new VuexPersistence({
    key: 'ralph',
    reducer: state => {
      return {
        favorites: state.favorites,
        customerType: state.customerType,
        vatIncluded: state.vatIncluded,
        list: {
          relocateAlias: state.list.relocateAlias,
          relocatePage: state.list.relocatePage
        }
      };
    },
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
      setItem: (key, value) => {
        app.$cookies.set(key, value, {
          ...defaultConfigCookie,
          expires: new Date(new Date().getTime() + 31536000000)
        });
      },
      removeItem: key => app.$cookies.remove(key, defaultConfigCookie)
    }
  }).plugin(store);
};
