<template>
  <CaAccountPage class="ca-settings-page">
    <CaAccountSettings
      v-if="user"
      :user="user"
      :genders="genders"
      @save="user = $event"
    />
    <CaSpinner class="ca-settings-page__spinner" :loading="!user" />
  </CaAccountPage>
</template>

<script>
import getUserQuery from 'user/get.graphql';
export default {
  middleware: 'authenticated',
  name: 'SettingsPage',
  transition: 'no-transition',
  apollo: {
    getUser: {
      query: getUserQuery,
      variables() {
        return {
          apiKey: this.$config.apiKey.toString()
        };
      },
      fetchPolicy: 'no-cache',
      result(result) {
        if (result.data) {
          this.user = result.data.getUser;
        }
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
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
  methods: {}
};
</script>

<style lang="scss">
.ca-settings-page {
  &__spinner.ca-spinner {
    margin: 48px auto;
    width: 40px;
    height: 40px;
    border-color: $c-accent-color;
  }
}
</style>
