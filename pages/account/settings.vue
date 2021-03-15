<template>
  <CaAccountPage class="ca-settings-page">
    <CaAccountSettings
      v-if="user"
      :user="user"
      :genders="genders"
      @save="user = $event"
    />
    <CaSpinner :loading="!user" />
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
      fetchPolicy: 'cache-and-network',
      result(result) {
        this.user = result.data.getUser;
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
  &__spinner {
  }
}
</style>
