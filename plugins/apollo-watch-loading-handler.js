// plugins/apollo-watch-loading-handler.js
export default (isLoading, countModifier, nuxtContext) => {
  let loading = 0;
  loading += countModifier;
  console.log('Global loading', loading, countModifier);
};
