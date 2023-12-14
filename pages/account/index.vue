<template>
  <div class="ca-account-page">
    <CaContainer class="ca-account-page__container">
      <h1 class="ca-account-page__title">{{ title }}</h1>
      <CaSpinner :loading="true" class="ca-account-page__spinner" />
    </CaContainer>
  </div>
</template>

<script>
/*
  Renders the account index page.

*/
import MixAccountIndex from 'MixAccountIndex';
export default {
  name: 'AccountPage',
  mixins: [MixAccountIndex],
  meta: {
    pageType: 'Account Page',
  },
};
</script>

<style lang="scss">
@import './styles/pages/account-page';
</style>
