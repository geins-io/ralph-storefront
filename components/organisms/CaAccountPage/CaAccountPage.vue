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
          <h2 class="ca-customer-service-box__title">Behöver du hjälp?</h2>
          <p class="ca-customer-service-box__text">
            Vi finns här för att hjälpa dig. Hör av dig till oss om du har
            problem.
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
  data: () => ({
    accountMenu: [
      {
        name: 'Ordrar',
        path: 'account-orders'
      },
      {
        name: 'Inställningar',
        path: 'account-settings'
      }
    ]
  }),
  computed: {
    currentPageTitle() {
      const currentPage = this.accountMenu.find(
        i => this.localePath(i.path) === this.$route.path
      );
      return this.$store.getters.viewport === 'phone'
        ? 'Mina sidor'
        : 'Mina sidor / ' + currentPage?.name;
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
    @include bp(tablet) {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
  &__content {
    width: 100%;
    background: $c-lightest-gray;
    padding: $px16 $px12;
    @include bp(tablet) {
      border: $border-light;
      padding: $px20 $px40;
    }
  }
}
.ca-customer-service-box {
  width: 300px;
  border: $border-light;
  background: $c-lightest-gray;
  padding: $px16;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include bp(tablet) {
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
