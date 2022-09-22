<template>
  <CaAccountPage class="ca-balance-page">
    <client-only>
      <CaAccountSettingsBlock
        :title="$t('ACCOUNT_BALANCE_PAGE_TITLE')"
        :editable="false"
        :loading="loading"
      >
        <template #content>
          <p class="ca-balance-page__balance">{{ balance }}</p>
        </template>
      </CaAccountSettingsBlock>
    </client-only>
  </CaAccountPage>
</template>

<script>
import getUserQuery from 'user/get.graphql';
export default {
  middleware: 'authenticated',
  name: 'BalancePage',
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
    loading: false
  }),
  computed: {
    balance() {
      return this.user ? this.user.balanceFormatted : '';
    }
  },
  methods: {},
  meta: {
    pageType: 'Balance Page'
  }
};
</script>

<style lang="scss">
.ca-balance-page {
  &__balance {
    font-weight: $font-weight-bold;
    font-size: $font-size-xxl;
  }
}
</style>
