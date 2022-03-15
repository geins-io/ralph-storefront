<template>
  <div class="ca-account-page">
    <CaContainer class="ca-account-page__container">
      <h1 class="ca-account-page__title">{{ title }}</h1>
      <CaSpinner :loading="true" class="ca-account-page__spinner" />
    </CaContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import getUserQuery from 'user/get.graphql';
export default {
  middleware: 'authenticated',
  name: 'AccountPage',
  data: () => ({}),
  computed: {
    title() {
      return this.$route.query.loginToken
        ? this.$t('ACCOUNT_LOGGING_IN_AS_USER')
        : this.$t('ACCOUNT_TITLE');
    },
    ...mapState(['auth'])
  },
  watch: {
    'auth.client'(val) {
      if (val && this.$route.query.loginToken) {
        this.auth.client.setTokenData({
          token: this.$route.query.loginToken,
          maxAge: 3600
        });
        this.$store.dispatch('auth/update', {
          username: 'spoofed-user@carismar.com',
          rememberUser: false
        });
        if (this.$config.customerTypesToggle) {
          this.$store.dispatch('loading/start');
          this.$apollo
            .query({
              query: getUserQuery,
              errorPolicy: 'all',
              fetchPolicy: 'no-cache'
            })
            .then(result => {
              this.$store.dispatch('loading/end');
              if (!result.errors) {
                const type = result.data?.getUser?.customerType;
                this.$store.dispatch('changeCustomerType', type);
                this.$store.dispatch('setCustomerTypeCookie', type);
                this.$router.replace(this.localePath('account-orders'));
              }
            })
            .catch(error => {
              // eslint-disable-next-line no-console
              console.log(error);
            });
        } else {
          this.$router.replace(this.localePath('account-orders'));
        }
      }
    }
  },
  created() {},
  mounted() {
    if (!this.$route.query.loginToken) {
      this.$router.replace(this.localePath('account-orders'));
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.ca-account-page {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0 $px40;
  }
  &__title {
    font-size: $font-size-xxl;
    font-weight: $font-weight-bold;
    margin: 0 0 $px40;
  }
  &__spinner.ca-spinner {
    width: 60px;
    height: 60px;
    border-color: $c-accent-color;
  }
}
</style>
