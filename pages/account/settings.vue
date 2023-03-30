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
  Renders the settings page.

  apollo:
    getUser: The user query.
*/
import getUserQuery from 'user/get.graphql';
export default {
  middleware: 'authenticated',
  name: 'SettingsPage',
  transition: 'no-transition',
  apollo: {
    getUser: {
      query: getUserQuery,
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      result(result) {
        if (result.data) {
          this.user = result.data.getUser;
        }
      },
      error(error) {
        this.$nuxt.error({ statusCode: 500, message: error });
      }
    }
  },
  data: vm => ({
    user: null,
    loading: false,
    genders: [
      {
        value: 'UNSPECIFIED',
        label: vm.$t('ACCOUNT_GENDER_UNSPECIFIED')
      },
      {
        value: 'WOMAN',
        label: vm.$t('ACCOUNT_GENDER_WOMAN')
      },
      {
        value: 'MAN',
        label: vm.$t('ACCOUNT_GENDER_MAN')
      }
    ]
  }),
  methods: {},
  meta: {
    pageType: 'Settings Page'
  }
};
</script>

<style lang="scss">
@import './styles/pages/settings-page';
</style>
