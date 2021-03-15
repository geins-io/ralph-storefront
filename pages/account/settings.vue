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
import getUserQuery from 'user/get-user.graphql';
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
  data: () => ({
    user: null,
    loading: false,
    genders: [
      {
        value: 'UNSPECIFIED',
        label: 'Ospecificerat'
      },
      {
        value: 'WOMAN',
        label: 'Kvinna'
      },
      {
        value: 'MAN',
        label: 'Man'
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
    border-color: #333;
  }
}
</style>
