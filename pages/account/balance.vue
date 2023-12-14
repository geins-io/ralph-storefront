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
*/
import MixAccountBalance from 'MixAccountBalance';
export default {
  name: 'BalancePage',
  mixins: [MixAccountBalance],
  meta: {
    pageType: 'Balance Page',
  },
};
</script>

<style lang="scss">
@import './styles/pages/balance-page';
</style>
