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
/*
  Renders the balance page.

  apollo:
    getUser: The user query.

  data:
    user: The user object.
    loading: Boolean that indicates if the page is loading.

  computed:
    balance: The formatted balance of the user.

*/
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
@import './styles/pages/balance-page';
</style>
