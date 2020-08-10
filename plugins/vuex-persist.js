import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  new VuexPersistence({
    key: 'my-app',
    storage: window.localStorage
  }).plugin(store);
};
