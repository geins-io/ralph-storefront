<template>
  <div class="ca-account-page">
    <CaContainer>
      <CaAccountHeader :nav-items="accountMenu" :title="currentPageTitle" />
    </CaContainer>
    <CaContainer
      :design="$store.getters.viewport === 'phone' ? 'full-width' : 'default'"
    >
      <div class="ca-account-page__body">
        <div class="ca-account-page__content">
          <slot></slot>
        </div>
        <div class="ca-customer-service-box">
          <h2 class="ca-customer-service-box__title">
            {{ $t('CUSTOMER_SERVICE_BOX_TITLE') }}
          </h2>
          <p class="ca-customer-service-box__text">
            {{ $t('CUSTOMER_SERVICE_BOX_TEXT') }}
          </p>
          <a
            class="ca-customer-service-box__contact"
            :href="'tel:' + $config.customerServicePhone"
          >
            <CaIconAndText icon-name="phone">
              {{ $config.customerServicePhone }}
            </CaIconAndText>
          </a>
          <a
            class="ca-customer-service-box__contact"
            :href="'mailto:' + $config.customerServiceEmail"
          >
            <CaIconAndText icon-name="mail">
              {{ $config.customerServiceEmail }}
            </CaIconAndText>
          </a>
        </div>
      </div>
    </CaContainer>
  </div>
</template>
<script>
/*
  CaAccountPage is a reusable component that displays the account header and the customer service box.
  It receives no props.

  It also dispatches the 'loading/end' action when the component is mounted.

  It uses the following components:
  - CaAccountHeader
  - CaContainer
  - CaIconAndText
  - CaButton
*/
export default {
  name: 'CaAccountPage',
  mixins: [],
  props: {},
  data: vm => ({
    accountMenu: [
      {
        name: vm.$t('ACCOUNT_ORDERS_TITLE'),
        path: 'account-orders'
      },
      {
        name: vm.$t('ACCOUNT_SETTINGS_TITLE'),
        path: 'account-settings'
      },
      {
        name: vm.$t('ACCOUNT_BALANCE_TITLE'),
        path: 'account-balance'
      }
    ]
  }),
  computed: {
    currentPageTitle() {
      const currentPage = this.accountMenu.find(
        i => this.$getPath(i.path) === this.$route.path
      );
      const accountTitle = this.$t('ACCOUNT_TITLE');
      return this.$store.getters.viewport === 'phone'
        ? accountTitle
        : accountTitle + ' / ' + currentPage?.name;
    }
  },
  watch: {},
  mounted() {
    this.$store.dispatch('loading/end');
  },
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-account-page';
</style>
