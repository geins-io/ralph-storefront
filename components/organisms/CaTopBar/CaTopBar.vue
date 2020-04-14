<template>
  <div class="ca-top-bar">
    <CaContainer class="ca-top-bar__container">
      <a class="ca-top-bar__lang-switcher only-desktop" href="javascript:;">
        <CaFlag country="se" shape="circle" />
        Sverige
      </a>
      <NuxtLink
        class="ca-top-bar__link ca-top-bar__link--customer-service only-desktop"
        to="/"
      >
        {{ $t('CUSTOMER_SERVICE') }}
      </NuxtLink>
      <div class="ca-usp-block ca-top-bar__usps only-desktop">
        <CaIconAndText class="ca-top-bar__usp" icon-name="check-circle">
          {{ $t('USP_1') }}
        </CaIconAndText>
        <CaIconAndText class="ca-top-bar__usp" icon-name="check-circle">
          {{ $t('USP_2') }}
        </CaIconAndText>
        <CaIconAndText class="ca-top-bar__usp" icon-name="check-circle">
          {{ $t('USP_3') }}
        </CaIconAndText>
      </div>
      <div class="ca-top-bar__usp only-mobile">{{ $t('USP_TEXT') }}</div>
      <a
        class="ca-top-bar__link ca-top-bar__link--login only-desktop"
        href="javascript:;"
      >
        <CaIconAndText icon-name="user">
          {{ $t('LOG_IN_LINK') }}
        </CaIconAndText>
      </a>
      <CaVatToggle class="only-desktop" />
    </CaContainer>
  </div>
</template>
<script>
import {
  CaIconAndText,
  CaFlag,
  CaVatToggle,
  CaContainer
} from '@ralph/ralph-ui';
export default {
  name: 'CaTopBar',
  components: {
    CaIconAndText,
    CaFlag,
    CaVatToggle,
    CaContainer
  },
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
$top-bar-height: rem-calc(20px);
$top-bar-height-desktop: rem-calc(36px);
.ca-top-bar {
  background: $c-topbar-bg;
  font-size: $font-size-xs;
  &__container {
    display: flex;
    height: $top-bar-height;
    line-height: $top-bar-height;
    justify-content: center;
    @include bp(laptop) {
      height: $top-bar-height-desktop;
      line-height: $top-bar-height-desktop;
      justify-content: space-between;
    }
  }
  &__usps {
    @include bp(desktop) {
      @include calign;
    }
  }
  &__usp {
    @include bp(laptop) {
      margin: 0 $px16;
    }
  }
  &__link {
    &--login {
      margin: 0 $px24 0 auto;
    }
    &--customer-service {
      margin: 0 auto 0 $px24;
    }
  }
}
</style>
