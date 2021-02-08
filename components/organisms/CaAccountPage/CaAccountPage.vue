<template>
  <div class="ca-account-page">
    <CaContainer :width="$store.state.viewport === 'phone' ? 'full' : 'slim'">
      <CaAccountHeader :nav-items="accountMenu" :title="currentPageTitle" />
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
          <a class="ca-customer-service-box__contact" href="tel:123234345">
            <CaIconAndText icon-name="phone">123234345</CaIconAndText>
          </a>
          <a
            class="ca-customer-service-box__contact"
            href="mailto:info@ralph.io"
          >
            <CaIconAndText icon-name="mail">info@ralph.io</CaIconAndText>
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
      return (
        'Mina sidor / ' +
        this.accountMenu.find(i => this.localePath(i.path) === this.$route.path)
          .name
      );
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-account-page {
  &__body {
    @include bp(tablet) {
      display: flex;
      justify-content: space-between;
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
  width: 266px;
  border: $border-light;
  background: $c-lightest-gray;
  padding: $px20 $px16;
  @include bp(tablet) {
    margin: 0 0 0 $px32;
  }
}
</style>
