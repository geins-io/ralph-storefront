<template>
  <CaAccountPage class="ca-settings-page">
    <CaAccountSettings :user="user" :genders="genders" @save="user = $event" />
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
      context() {
        return {
          headers: this.$store.state.auth.headers
        };
      },
      errorPolicy: 'all',
      result(result) {
        this.user = result.data.getUser;
        // if (result.errors?.length) {
        //   this.refreshToken().then(result => {
        //     if (result) {
        //       this.$apollo.queries.getUser.refetch();
        //     }
        //   });
        // } else {
        //   this.user = result.data.getUser;
        // }
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  data: () => ({
    user: null,
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
  methods: {
    refreshToken() {
      return this.$store.dispatch('auth/refreshToken');
    }
  }
};
</script>

<style lang="scss">
.ca-settings-page {
}
</style>
