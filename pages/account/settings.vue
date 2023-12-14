<template>
  <CaAccountPage class="ca-settings-page">
    <client-only>
      <CaAccountSettings
        v-if="user"
        :user="user"
        :genders="genders"
        @save="user = $event"
      />
      <CaSpinner class="ca-settings-page__spinner" :loading="!user" />
    </client-only>
  </CaAccountPage>
</template>

<script>
/*
  Renders the account settings page.
*/
import MixAccountSettings from 'MixAccountSettings';
export default {
  name: 'SettingsPage',
  mixins: [MixAccountSettings],
  methods: {},
  meta: {
    pageType: 'Settings Page',
  },
};
</script>

<style lang="scss">
@import './styles/pages/settings-page';
</style>
