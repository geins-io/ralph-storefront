<template>
  <div class="ca-account-page">
    <CaContainer width="slim">
      <CaAccountHeader :nav-items="accountMenu" :title="currentPageTitle" />
    </CaContainer>
    <CaContainer :width="$store.getters.viewport === 'phone' ? 'full' : 'slim'">
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
            <CaIconAndText icon-name="phone">{{
              $config.customerServicePhone
            }}</CaIconAndText>
          </a>
          <a
            class="ca-customer-service-box__contact"
            :href="'mailto:' + $config.customerServiceEmail"
          >
            <CaIconAndText icon-name="mail">{{
              $config.customerServiceEmail
            }}</CaIconAndText>
          </a>
        </div>
      </div>
    </CaContainer>
  </div>
</template>
<script>
// @group Organisms
// @vuese
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
      }
    ]
  }),
  computed: {
    currentPageTitle() {
      const currentPage = this.accountMenu.find(
        i => this.localePath(i.path) === this.$route.path
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
.ca-account-page {
  &__body {
    @include bp(laptop) {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
  &__content {
    width: 100%;
    background: $c-lightest-gray;
    padding: $px16 $px12;
    @include bp(laptop) {
      border: $border-light;
      padding: $px20 $px40;
      min-height: rem-calc(180px);
    }
  }
}
.ca-customer-service-box {
  max-width: rem-calc(300px);
  width: 100%;
  border: $border-light;
  background: $c-lightest-gray;
  padding: $px16;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: $px20 auto 0;
  @include bp(laptop) {
    margin: 0 0 0 $px32;
  }
  &__title {
    font-weight: $font-weight-bold;
    font-size: $font-size-l;
  }
  &__text {
    margin: $px10 0 $px4;
  }
  &__contact {
    margin: $px8 0 0;
    font-weight: $font-weight-bold;
    font-size: $font-size-m;
  }
}
</style>
